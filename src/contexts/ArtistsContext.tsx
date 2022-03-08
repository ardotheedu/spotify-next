import { createContext, ReactNode, useState, useEffect } from "react"
import { setCookie, destroyCookie,  } from 'nookies'
import { v4 as uuidv4 } from 'uuid';
import { api } from "../services/api";
import { apinext } from "../services/apinext";
import Router from "next/router";
import axios from "axios";

interface Tracks {
    tracks: {
        name: string;
        href: string;
        artists: {
            name: string;
        }[]
        album: {
            imagens: {
                url: string;
            }[]
        }  
    }[]
}

export interface TracksListData extends Tracks{
    id: string;
    temperature: number;
    city: string;
    category: string;
    createdAt: string;
}

interface WeatherObject {
    main: {
      temp: number;
    }
}

interface SearchWeatherAndGetTracks {
    searchOption: string; 
    city?: string; 
    latitude?: string; 
    longitude?: string;
}

type AuthContextData = {
    signIn(code: string): Promise<void>;
    signOut: () => void;
    getTracks(temperature: number, city: string): Promise<void>;
    data: TracksListData;
    city: string;
    setCity: (city: string) => void;
    handleSearchWeatherAndGetTracks: (searchWeatherAndGetTracks: SearchWeatherAndGetTracks) => void;
}
type AuthProviderProps = {
    children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel

export function signOut() {
    destroyCookie(undefined, 'spotifyauth.token')
    destroyCookie(undefined, 'spotifyauth.refreshToken')

    authChannel.postMessage('signOut')

    Router.push('/')
}

// seeds for recomend musics
const pop_artists_seeds = "5D56dZmhE9DgT01XixdHiD"
const rock_artists_seeds = "1dfeR4HaWDbWqFHLkxsg1d"
const classical_artists_seeds = "2wOqMjp9TyABvtHdOSOTUS"
const lofi_artists_seeds = "4Yccu9UQwMSEegvhhS6tRK"

const pop_genres_seeds = "pop"
const rock_genres_seeds = "rock"
const classical_genres_seeds = "classical"
const lofi_genres_seeds = "sleep"

const pop_tracks_seeds = "5y1vdBmkTHZNGCz5qswQzM"
const rock_tracks_seeds = "1GbtB4zTqAsyfZEsm1RZfx"
const classical_tracks_seeds = "4bNwPPpk01D8pVV9IFSBde"
const lofi_tracks_seeds = "3U5vBZK5EKPZPGUK35Bksa"

export function AuthProvider({ children }: AuthProviderProps) {

    useEffect(() => {
        authChannel = new BroadcastChannel('auth') 
        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut()
                    break;
                default:
                    break;
            }
        }
    }, [])

    async function signIn(code: string){
        try {
            
            const response = await apinext.post('/access_token', {
                code,
            })

            const {access_token, refresh_token} = response.data;

            setCookie(undefined, 'spotifyauth.token', access_token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            })
            setCookie(undefined, 'spotifyauth.refreshToken', refresh_token,{
                maxAge: 60 * 60 * 24 * 30,
                path: '/' // /path vai definir de formar global
            })

            api.defaults.headers['Authorization'] = `Bearer ${access_token}`

            Router.push('/ranking')
        } catch (err) {
            console.log(err)
        }
    }

    const [data, setData] = useState<TracksListData>({} as TracksListData);
    const [city, setCity] = useState('')
    
    async function getTracks(temperature: number, city: string){
        try {

            let category = ''
            let seed_artists = ''
            let seed_genres = ''
            let seed_tracks = ''
            
            if(temperature > 32) {
                category = 'rock'
                seed_artists = rock_artists_seeds;
                seed_genres = rock_genres_seeds;
                seed_tracks = rock_tracks_seeds;
            }else if(temperature < 32 && temperature > 24) {
                category = 'pop'
                seed_artists = pop_artists_seeds;
                seed_genres = pop_genres_seeds;
                seed_tracks = pop_tracks_seeds;
            }else if(temperature < 24 && temperature > 16) {
                category = 'classica'
                seed_artists = classical_artists_seeds;
                seed_genres = classical_genres_seeds;
                seed_tracks = classical_tracks_seeds;
            } else if (temperature > 16) {
                category = 'sleep'
                seed_artists = lofi_artists_seeds;
                seed_genres = lofi_genres_seeds;
                seed_tracks = lofi_tracks_seeds;
            }

            const response_tracks = await api.get<Tracks>(`https://api.spotify.com/v1/recommendations`, {
                params: {
                    market: "BR",
                    seed_artists,
                    seed_genres,
                    seed_tracks,
                    
                }
            })

            let dataFormatted: TracksListData = {
                id: uuidv4(),
                temperature,
                city,
                category,
                tracks: response_tracks.data.tracks,
                createdAt: new Date().toLocaleString('pt-BR', {
                    weekday: 'short', 
                    day: 'numeric',
                    year: 'numeric',
                    month: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                }),
            }

            console.log(dataFormatted)
            setData(dataFormatted)
            
            
        } catch (err) {
            console.log(err)
        }
       
    }
    async function handleSearchWeatherAndGetTracks({searchOption, city, latitude, longitude}: SearchWeatherAndGetTracks) {
        const response =  searchOption == "cidade" ?
        await axios.get<WeatherObject>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WHEATER_KEY}`, {
          params: {
            units: 'metric'
          }
        })
        : 
        await axios.get<WeatherObject>(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WHEATER_KEY}`, {
          params: {
            units: 'metric'
          }
        })

        await getTracks(response.data.main.temp, city)
    }

    return (
        <AuthContext.Provider value={{signIn, signOut, getTracks, data, city, setCity, handleSearchWeatherAndGetTracks}}>
            {children}
        </AuthContext.Provider>
    )
}