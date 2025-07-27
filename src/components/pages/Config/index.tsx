import styles from './Config.module.scss';
import { UserConfigRow } from './shared/UserConfigRow';

export const Config = () => {
    return (
        <section className={styles.configSection}>
            <UserConfigRow />
        </section>
    );
};
