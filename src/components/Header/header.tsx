import styles from './styles.module.scss'
import Image from 'next/image'
import Logo from '../../assets/images/logo.png'
import { FaBars } from 'react-icons/fa'
import { useEffect } from 'react'
import { hideSidebar } from '../../utils'

export default function Header() {
    useEffect(() => {
        document.addEventListener("click", hideSidebar)

        return () => document.removeEventListener("click", hideSidebar)
    }, [])


    return (
        <header className={styles.headerContainer}>
            <input id="input-check" type="checkbox" />
            <ul>
                <li>
                    <a href='https://sempre-supra.s3.amazonaws.com/regulamento.pdf' target='_blank' rel="noreferrer">
                        Regulamento
                    </a>
                </li>
                <li>
                    <a href='https://sempresupra.com.br/campanha-de-indicacao/' target='_blank' rel="noreferrer">
                        Indique um amigo
                    </a>
                </li>
                <li>
                    <a href="https://sempresupra.com.br/contato/" target='_blank' rel="noreferrer">
                        Contato
                    </a>
                </li>
            </ul>

            <label htmlFor="input-check">
                <a id="open-sidebar"><FaBars /></a>
            </label>
            <div className={styles.logo}>
                <div className={styles.background}>
                    <Image src={Logo} className={styles.img} />
                </div>
            </div>
        </header>
    )
}