import styles from './Config.module.scss';
import { ConfirmationConfigRow } from './shared/ConfirmationConfigRow';
import { UserConfigRow } from './shared/UserConfigRow';

export const Config = () => {
    return (
        <section className={styles.configSection}>
            <UserConfigRow />
            <ConfirmationConfigRow />
        </section>
    );
};
