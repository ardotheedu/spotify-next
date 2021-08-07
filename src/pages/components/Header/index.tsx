import Link from 'next/link'

import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="spot.me" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/ranking">
                        <a>Ranking</a>
                    </ActiveLink>
                </nav>
            </div>
        </header>
    )
}