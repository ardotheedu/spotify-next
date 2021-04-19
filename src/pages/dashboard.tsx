import React, {useState, useEffect} from 'react';
import { GetServerSideProps } from 'next'
import '../styles/pages/dashboard.module.css'
import { spotifyApi, authToken } from '../service/dashboard';



export default function Dashboard({result}) {

  let [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setArtists(result)
  }, [result]) 
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  var stateKey = 'spotify_auth_state';

  // const storedState = ctx.req.cookies ? ctx.req.cookies[stateKey] : null;
  // var state = ctx.query.state || null;
  var code = ctx.query.code as string;

  const validToken = spotifyApi.getAccessToken()
  if (!validToken) {
    await authToken({code})
  }

  const result = await spotifyApi.getMyTopArtists()
  .then(
    (data) => {
      return data.body.items
    }, (error) => {
      console.log("Something went wrong", error)
    }
  )
  return {
    props: {
      result
    }
  }
}