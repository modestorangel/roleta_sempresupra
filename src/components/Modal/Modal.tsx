import styles from './styles.module.scss'
import { FaWindowClose } from 'react-icons/fa'

type ModalProps = {
    title: string
    text?: any
    visible: boolean
    onClose: Function
}

export default function Modal({ title, visible, onClose }: ModalProps) {
    return (
        <>
            {
                visible &&
                <div className={styles.modalContainer}>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h2>{title}</h2>
                            <a href="#" onClick={() => onClose()} role="button">X</a>
                        </div>
                        <div className={styles.body}>
                            <h3>Os dados fornecidos estão incorretos.
                                Verifique os dados do associado(a) e tente novamente.
                            </h3>
                            <h3>
                                Se o problema continuar, entre em contato com a gente via e-mail ou telefone.
                                Contatos: (21) 3400-1050 | (21) 96772-3535 | marketing@sempresupra.com.br
                            </h3>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}