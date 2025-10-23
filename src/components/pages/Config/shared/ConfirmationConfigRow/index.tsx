import { Anchor } from '@/components/atoms/Anchor';
import { ArrowIcon } from '@/components/atoms/icons/ArrowIcon';
import { ConfirmationsIcon } from '@/components/atoms/icons/ConfirmationsIcon';
import { useId } from 'react';
import sharedStyles from '../Config-shared.module.scss';
import styles from './ConfirmationConfigRow.module.scss';

export const ConfirmationConfigRow = () => {
    const descriptionId = useId();
    return (
        <article>
            <Anchor
                to="/config-confirmations"
                aria-describedby={descriptionId}
                className={sharedStyles.anchorRow}
            >
                <ConfirmationsIcon className={styles.confirmationIcon} />
                <span id={descriptionId}>Confirmações</span>
                <ArrowIcon
                    className={sharedStyles.arrow}
                    title="Selecione configurações do usuário"
                />
            </Anchor>
        </article>
    );
};
