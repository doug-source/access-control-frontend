import { UserIcon } from '@/components/atoms/icons/UserIcon';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useId } from 'react';
import styles from './UserBtn.module.scss';

export const UserBtn = () => {
    const descriptionId = useId();
    const navigate = useLocalNavigate();
    return (
        <button
            className={styles.userBtn}
            type="button"
            aria-describedby={descriptionId}
            onClick={() => navigate('/config')}
        >
            <UserIcon title="configurações" />
            <span id={descriptionId} className="screen-reader-only">
                Botão para visualizar detalhes da pessoa autenticada
            </span>
        </button>
    );
};
