import { Anchor } from '@/components/atoms/Anchor';
import { ArrowIcon } from '@/components/atoms/icons/ArrowIcon';
import { UserIcon } from '@/components/atoms/icons/UserIcon';
import { useId } from 'react';
import styles from './UserConfigRow.module.scss';

export const UserConfigRow = () => {
    const descriptionId = useId();
    return (
        <article>
            <Anchor
                to="/config-user"
                aria-describedby={descriptionId}
                className={styles.anchorRow}
            >
                <UserIcon className={styles.userIcon} />
                <span id={descriptionId}>Usuário</span>
                <ArrowIcon
                    className={styles.arrow}
                    title="Selecione configuraões do usuário"
                />
            </Anchor>
        </article>
    );
};
