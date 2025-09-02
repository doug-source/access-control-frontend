import { Anchor } from '@/components/atoms/Anchor';
import { memo } from 'react';
import styles from './ForgotPassLink.module.scss';

export const ForgotPassLink = memo(() => (
    <Anchor to="/forgot" className={styles.forgotPass}>
        Esqueceu ?
    </Anchor>
));
