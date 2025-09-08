import { Btn } from '@/components/atoms/Btn';
import { useNavigate } from 'react-router';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.errorContainer}>
            <h1>Oops!</h1>
            <p>Desculpe, ocorreu um erro inesperado!</p>
            <Btn
                className={styles.goBackHomeBtn}
                onClick={() => navigate('/home', { replace: true })}
            >
                Voltar
            </Btn>
        </div>
    );
};
