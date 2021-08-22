import Link from 'next/link'

import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'
import { FiLogOut } from 'react-icons/fi'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/ArtistsContext'
export function Header() {
    const { signOut } = useContext(AuthContext)
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div>
                    <img src="/images/logo.svg" alt="spot.me" />
                    <nav>
                        <ActiveLink activeClassName={styles.active} href="/ranking">
                            <a>Ranking</a>
                        </ActiveLink>
                    </nav>
                </div>
                <div>
                    <button onClick={signOut} className={styles.logout}>
                        <FiLogOut size={20}/>
                    </button>
                </div>
            </div>
        </header>
    )
}