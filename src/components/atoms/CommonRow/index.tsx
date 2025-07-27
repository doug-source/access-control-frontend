import { type ComponentPropsWithoutRef } from 'react';
import styles from './CommonRow.module.scss';

type CommonRowProps = ComponentPropsWithoutRef<'div'>;

export const CommonRow = ({ children, ...remain }: CommonRowProps) => (
    <div {...remain} className={styles.commonRow}>
        {children}
    </div>
);
