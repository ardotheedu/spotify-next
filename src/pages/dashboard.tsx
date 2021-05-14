import React, {useState, useEffect} from 'react';
import { GetServerSideProps } from 'next'
import styles from './dashboard.module.css'
import { spotifyApi, authToken } from '../service/dashboard';
import Carousel from 'react-bootstrap/Carousel'

export default function Dashboard({result}) {
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>()

  useEffect(() => {
    setArtists(result)
  }, [result]) 

    if(!artists) {
        return (
            <div className={styles.loaderwrapper}>
                <div className={styles.loader}></div>

                <div className={`${styles.loadersection} ${styles.sectionleft}`}></div>
                <div className={`${styles.loadersection} ${styles.sectionright}`}></div>

            </div>
        )
    }


  
  return (
    <div className="background-per">
        <Carousel>

            {artists.map(artist => (
              <Carousel.Item>
                <img
                  className={styles.w100}
                  src={artist.images[0].url}
                  alt={artist.name} 
                />
                <Carousel.Caption>
                  <h3>{artist.name}</h3>
                  <p>Numero de seguidores: {artist.followers.total}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          
          </Carousel>
        
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var code = ctx.query.code as string;

  const validToken = spotifyApi.getAccessToken()
  if (!validToken) {
    await authToken({code})
  }

  const result = await spotifyApi.getMyTopArtists({time_range: 'long_term'})
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