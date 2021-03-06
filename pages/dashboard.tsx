import React, {useState, useEffect} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useRouter } from 'next/router'
import '../styles/pages/dashboard.css'

interface AuthState {
    token: string;
}

export default function Dashboard(props: SpotifyApi.ArtistObjectFull[]) {
  
    let [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>()
    const [activeImageIndex, setActiveImageIndex] = useState(0)


    // eslint-disable-next-line no-restricted-globals
    const url_atual = location.search
    
    setArtists(props)

    console.log(artists)

    if(!artists) {
        return (
            <div id="loader-wrapper">
                <div id="loader"></div>

                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>

            </div>
        )
    }

    console.log(artists)
  
  return (
    <div className="background-per">
        <h1 className="title-per">Your Favorites Artists</h1>
            <div className="personalization">
            {artists.map((artist) => {
            return(
                    <div id="artist">
                        <p className="artist-name" key={artist.name}>{artist.name}</p>
                        <img 
                        src={artist.images[activeImageIndex].url} 
                        alt={artist.name} 
                        key={artist.images[activeImageIndex].url}
                        className="artist-image"/>
                    </div> 
            ) 
            })}
            </div>
        
    </div>
  );
};

export async function getStaticProps(context) {
    const router = useRouter()
    const {code} = router.query
    const res = await fetch(`api/callback${code}`)
    const data = await res.json()
  
    if (!data) {
      return {
        notFound: true,
      }
    }
  
    return {
      props: {}, // will be passed to the page component as props
    }
}
