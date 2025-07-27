import { VerticalCardBox } from '@/components/atoms/VerticalCardBox';
import { BrandBtn } from '@/components/molecules/BrandBtn';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import styles from './NotFoundTemplate.module.scss';

export const NotFoundTemplate = () => {
    const navigate = useLocalNavigate();
    return (
        <div className={styles.notFoundPage}>
            <VerticalCardBox className={styles.card}>
                <img src="/img/spinning-top.png" alt="spinning top" />
                <p>Página inexistente</p>
                <BrandBtn onClick={() => navigate('/')}>
                    Voltar para Home
                </BrandBtn>
            </VerticalCardBox>
        </div>
    );
};
