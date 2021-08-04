import React, {useState, useEffect} from 'react';
import styles from './dashboard.module.css'
import Carousel from 'react-bootstrap/Carousel'
import { api } from '../services/api';

export default function Dashboard() {
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>()


  useEffect(() => {
    api.get('/me/top/artists')
      .then(response =>
        setArtists(response.data.items)
      )
  }, []) 

  console.log(artists)



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
    <>
        <div className={styles.content}>
          <header>
            <h1>Ranking</h1>
          </header>
  
          <main>
            
            <div>
              <p>POSIÇÃO</p>
              <p>ARTISTA</p>
              <p>SEGUIDORES</p>
            </div>
  
            { artists && artists.map((artist, index) => (
              <div
                key={artist.id}
              >
                <div
                  className={styles.punctuation}
                >
                    {index + 1}
                </div>
                
                <div 
                  className={styles.user}
                >
                  <img src={artist.images[0].url}/>
                  <article>
                    <strong>{artist.name}</strong>
                  </article>
                </div>
  
                <div className={styles.followers}>
                  <span>
                    {artist.followers.total}
                  </span> 
                </div>
                {/* <br/>
                <br/>
                <br/> */}
              </div>
            )) }
            <br/>
          </main>
        </div>
    </>
  );
};


