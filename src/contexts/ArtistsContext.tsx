import { createContext, ReactNode, useState, useEffect } from "react"
import { setCookie, parseCookies,  destroyCookie } from 'nookies'
import { api } from "../services/api";
import { apinext } from "../services/apinext";
import Router from "next/router";

type AuthContextData = {
    signIn(code: string): Promise<void>;
    signOut: () => void;
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

    return (
        <AuthContext.Provider value={{signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}