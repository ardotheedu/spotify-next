import React, {useState, useEffect} from 'react';
import request from 'request'
import SpotifyWebApi from 'spotify-web-api-node';
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import '../styles/pages/dashboard.module.css'



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

  const storedState = ctx.req.cookies ? ctx.req.cookies[stateKey] : null;
  var code = ctx.query.code as string;
  var state = ctx.query.state || null;

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  var credentials = {
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: 'http://localhost:3000/dashboard'
  }

  var spotifyApi = new SpotifyWebApi(credentials);
  
  await spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);

      if (data.body['access_token']){
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
      }
      
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  );
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