import type { ComponentPropsWithRef } from 'react';
import styles from './CommonRow.module.scss';

type CommonRowProps = ComponentPropsWithRef<'div'>;

export const CommonRow = ({ children, ...remain }: CommonRowProps) => (
    <div {...remain} className={styles.commonRow}>
        {children}
    </div>
);
