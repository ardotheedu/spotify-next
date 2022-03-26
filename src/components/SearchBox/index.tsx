import axios from 'axios';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import styles from './styles.module.scss';   
import { AuthContext, } from '../../contexts/ArtistsContext';

interface WeatherObject {
  main: {
    temp: number;
  }
}
export function SearchBox() {
    const [searchOption, setSearchOptions] = useState('cidade')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const {handleSearchWeatherAndGetTracks, setCity, city} = useContext(AuthContext)


    function handleSelectedOption(event: ChangeEvent<HTMLSelectElement>) {
      event.preventDefault;
      setSearchOptions(event.target.value)
    }

    function handleGetNewTracks() {
      handleSearchWeatherAndGetTracks({searchOption, city, latitude, longitude})
    }


    return (
        <div className={styles.container}>
          <div className={styles.searchBox}>
            <div className={styles.optionsBox} >
              <select className={styles.searchOptions}  onChange={e => handleSelectedOption(e)} title="Selecione entre cidade e coordenadas para saber a temperatura">
                <option value="cidade">Cidade</option>
                <option value="coordernadas">Coordenadas</option>
              </select>
            </div>
            {searchOption == 'cidade' ? (
              <div className={styles.searchBar}>
                <input type="text" placeholder="Digite o nome da cidade" value={city} onChange={e => setCity(e.target.value)}/>
              </div>
            ) : (
              <div className={styles.searchBar}>
                <input type="text" placeholder="Digite a latitude" value={latitude} onChange={e => setLatitude(e.target.value)}/>
                <input type="text" placeholder="Digite a longitude" value={longitude} onChange={e => setLongitude(e.target.value)}/>
              </div>  
            )}
          </div>
          <div>
              <button className={styles.search} onClick={() => handleGetNewTracks()}>
                Pesquisar
              </button>
          </div>
        </div>
    )
}