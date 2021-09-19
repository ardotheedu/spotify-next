import React, {useState, useEffect} from 'react';
import styles from '../styles/pages/ranking.module.scss';
import { Header } from '../components/Header'
import { api } from '../services/api';
import { useQuery } from 'react-query'

interface ImageObject {
  height?: number;
  url: string;
  width?: number;
}

interface ArtistObjectFull {
  followers: {
    href: null;
    total: number;
  };
  images: ImageObject[];
  name: string;
  id: string;
}

export default function Ranking() {
  const [time_range, setTimeRange] = useState('medium_term')
  async function getArtists(range: string) {
    const { data } = await api.get('/me/top/artists', {
      params: {
        time_range: range,
      }
    })

    const artistsFormatted = 
    data.items.map(artist => {
        return {
          ...artist,
          followers: { 
            total: artist.followers.total.toLocaleString('pt-BR')
        }
      }
    })
 
    return artistsFormatted        
  }

  const { isLoading, error, data, isFetching } = useQuery(['artists', time_range], () => getArtists(time_range), {
    staleTime: 1000 * 60 * 10,
  })

  if(isLoading || isFetching) {
      return (
          <div className={styles.loaderwrapper}>
              <div className={styles.loader}></div>

              <div className={`${styles.loadersection} ${styles.sectionleft}`}></div>
              <div className={`${styles.loadersection} ${styles.sectionright}`}></div>

          </div>
      )
  }

  function onTermRangeChange(range: string) {
    setTimeRange(range)
    console.log(time_range);
  }
  
  return (
    <>
        <Header />
        <div className={styles.content}>
          <header>
            <h1 className={styles.title}>Ranking</h1>
            <div className={styles.buttonGroupTerm}> 
              <button className={`${styles.button}`} onClick={() => onTermRangeChange('short_term')}>
                4 semanas
              </button>
              <button className={`${styles.button}`} onClick={() => onTermRangeChange('medium_term')}>
                6 meses
              </button>
              <button className={`${styles.button}`} onClick={() => onTermRangeChange('long_term')}>
                Anos
              </button>
            </div>
          </header>
  
          <main>
            
            <div>
              <p>posição</p>
              <p>artista</p>
              <p>seguidores</p>
            </div>
  
            { data && data.map((artist, index) => (
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


