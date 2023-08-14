import type { GetStaticProps, NextPage } from 'next'
import { Header, Roulette } from '../components'
import styles from '../styles/Home.module.scss'
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import User from '../types/user'
import get from './api/lib/awardSvc/get'
import { onCpf, isNullOrEmpty } from '../utils'

const Home: NextPage = ({ awards }: any) => {
  const [spinRoulette, setSpinRoulette] = useState(false)
  const [user, setUser] = useState<User>()
  const [formIsValid, setFormIsValid] = useState(true)

  const validateForm = () => {
    setFormIsValid(isNullOrEmpty(user?.name) || isNullOrEmpty(user?.cpf) || isNullOrEmpty(user?.email))
  }

  useEffect(() => {
    validateForm()
  }, [user])

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main>
          <div className={styles.section}>
            <h3>Campanha de indicação Julho</h3>
            <h1>Desenrola, gira e ganhe um premiozão!</h1>
            <div className={styles.form}>
              <h2>Você está a um passo de girar.</h2>
              <h4>Confirme os seus dados abaixo de associado(a).</h4>
              <input
                type="text"
                placeholder="Nome do associado(a)"
                value={user?.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="CPF do associado(a)"
                value={user?.cpf}
                maxLength={14}
                onChange={(e) => setUser({ ...user, cpf: onCpf(e.target.value) })}
              />
              <input
                type="text"
                placeholder="E-mail do associado(a)"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <button disabled={formIsValid} onClick={() => setSpinRoulette(true)}>
                Girar!
              </button>
              <h4>Atenção: Após preencher os dados, aguarde um instante para a validação dos dados</h4>
            </div>
            <div className={styles.infos}>
              <h3>Você no ritmo com a Sempre Supra.</h3>
              <h3>Você que garantiu sua indicação fechada, chegou o momento de girar* e acumular prêmios.</h3>
              <h5>*A cada indicação fechada você poderá girar a roleta 1 vez.</h5>
            </div>
            <div className={styles.icons}>
              <a href="https://web.whatsapp.com/send?phone=5521967723535" target='_blank' rel="noreferrer">
                <FaWhatsapp />
              </a>
              <a href="https://www.facebook.com/sempresupra" target='_blank' rel="noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/sempresupra/" target='_blank' rel="noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
          <div className={styles.article}>
            <Roulette
              awards={awards}
              spinRoulette={spinRoulette}
              setSpinRoulette={setSpinRoulette}
              user={user}
              setFormIsValid={setFormIsValid}
            />
          </div>
        </main>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const awards = await get()

  return {
    props: {
      awards: JSON.parse(JSON.stringify(awards))
    },
    revalidate: 60 * 60
  }
}
