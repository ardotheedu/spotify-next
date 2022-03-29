import styles from './styles.module.scss'
import { ActiveLink } from '../ActiveLink'
import { FiLogOut, FiMenu } from 'react-icons/fi'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/ArtistsContext'

import { MdClose } from "react-icons/md"


export function Header() {
    const { signOut } = useContext(AuthContext)
    const [navbarOpen, setNavbarOpen] = useState(false)
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
      }
    return (
        <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <img src="/images/logo.svg" alt="spot.me" />
                    <nav className={`${styles.navBar} ${navbarOpen && `${styles.opened}` }`}>
                        <button onClick={handleToggle} className={` ${styles.menu} ${!navbarOpen && `${styles.closed}`}`}>  {navbarOpen ? (
    <MdClose size={30} color="#e1e1e6"/>
  ) : (
    <FiMenu size={30} className="menu" color="#e1e1e6"/>
  )}</button>
                        <nav className={`${styles.menuNav} ${navbarOpen ? `${styles.showMenu}` : `${styles.hideMenu}`}`}>
                            <div className={styles.menuOptions}>
                                <ActiveLink activeClassName={`${styles.active} ${styles.menuItem}`} href="/ranking">
                                    <a>Ranking</a>
                                </ActiveLink>
                                <ActiveLink activeClassName={`${styles.active} ${styles.menuItem}`} href="/recomendations">
                                    <a>Recomendações</a>
                                </ActiveLink>
                            </div>
                            <div>
                                <button onClick={signOut} className={styles.logout}>
                                    <FiLogOut size={20}/>
                                </button>
                            </div>
                        </nav>

                    </nav>

                </div>
        </header>
    )
}