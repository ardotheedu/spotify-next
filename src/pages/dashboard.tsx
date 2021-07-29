import React, {useState, useEffect} from 'react';
import styles from './dashboard.module.css'
import Carousel from 'react-bootstrap/Carousel'
import { api } from '../services/api';

export default function Dashboard() {
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>()

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
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
      <img className={styles.backgroundper} src={artists[index].images[0].url} alt={artists[index].name} />
      <div className={styles.content}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
              {artists.map(artist => (
                <Carousel.Item>
                  <img
                    className={styles.w100}
                    src={artist.images[0].url}
                    alt={artist.name} 
                  />
                  <Carousel.Caption>
                    <h3>{artist.name}</h3>
                    <p>Número de seguidores: {artist.followers.total}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            
            </Carousel>
          
      </div>
    </>
  );
};


