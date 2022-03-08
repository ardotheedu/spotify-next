import { useContext } from 'react';
import { AuthContext, TracksListData } from '../../contexts/ArtistsContext';

import styles from './styles.module.scss'
import {AiOutlineSave} from 'react-icons/ai'

export interface TracksListDataSaved extends TracksListData {
    savedAt: string;
}

export function ListTracks() {

    const {data} = useContext(AuthContext)
    const saveRecomedations = () => {
        const recomendacoes = localStorage.getItem("recomendacoes");
        if (recomendacoes) {
            const savedAt = new Date().toLocaleString('pt-BR', {
                day: 'numeric',
                year: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            })
            const newData: TracksListDataSaved = {
                ...data,
                savedAt,
            }
            console.log(newData)
            const recomendacoesArray = JSON.parse(recomendacoes);
            recomendacoesArray.push(newData);
            localStorage.setItem("recomendacoes", JSON.stringify(recomendacoesArray));
        } else {
            localStorage.setItem("recomendacoes", JSON.stringify([data]));
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Musicas recomendadas</h1>
                <button className={styles.saveButton} onClick={saveRecomedations}><AiOutlineSave size={36} color="#e1e1e6"/></button>
            </div>
            { data.tracks?.map(track => (
                <div className={styles.tracks}>
                    <p key={track.name}>{track.name}</p>
                </div>
            ))}
        </div>
    )
}