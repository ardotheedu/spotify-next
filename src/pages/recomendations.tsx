import React, { useContext, useEffect } from 'react';
import { ListTracks } from '../components/ListTracks';
import { SearchBox } from '../components/SearchBox';
import styles from '../styles/pages/recomendations.module.scss';
import { Header } from '../components/Header'
import { useQuery } from 'react-query';
import { AuthContext } from '../contexts/ArtistsContext';
import axios from 'axios';


const Recomendations = () => {
  const {handleSearchWeatherAndGetTracks, setCity} = useContext(AuthContext)

  async function getCityByIP() {
    const cityResponse = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_IP_API_KEY}`)
    setCity(cityResponse.data.city)
    handleSearchWeatherAndGetTracks({searchOption: "cidade", city: cityResponse.data.city})    
  }
  
  useEffect(() => {
    getCityByIP()
  }, [])
  return (
    <>
      <Header />
      <div className={styles.container}>
        <SearchBox />
        <ListTracks />
      </div>
    </>
  )
}

export default Recomendations