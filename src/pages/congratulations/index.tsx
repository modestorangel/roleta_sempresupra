import styles from './styles.module.scss'
import Image from 'next/image'
import Logo from '../../assets/images/logo.png'
import { useAwardContext } from '../../context/saveAward'

export default function Congratulations() {
    const { awardWinner } = useAwardContext()
    return (
        <div className={styles.congratulationsContainer}>
            <h2>Seu prêmio foi:</h2>
            <h1>{awardWinner}</h1>
            <h2>Parabéns!</h2>
            <h3>Obrigado por participar da nossa campanha de indicação.</h3>
            <h4>Em breve, entraremos em contato para informar o próximo passo para a utilização.</h4>
            <h3>Continue indicando e acumule vantagens!</h3>
            <a href='https://sempresupra.com.br/campanha-de-indicacao/' target='_blank' rel="noreferrer">
                Acesse aqui a campanha deste mês
            </a>
            <h5>
                A entrega dos prêmios será até 30 de setembro, exceto o desconto no boleto. Os descontos serão aplicados nos boletos de outubro de 2022.
            </h5>
            <Image src={Logo} />
        </div>
    )
}