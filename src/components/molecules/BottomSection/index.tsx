import type { ComponentPropsWithRef, PropsWithChildren } from 'react';
import styles from './BottomSection.module.scss';

interface BottomSectionProps extends ComponentPropsWithRef<'div'> {
    label: string;
}

export const BottomSection = ({
    label,
    children,
    ...remain
}: PropsWithChildren<BottomSectionProps>) => (
    <div {...remain} className={styles.bottomSection}>
        <div className={styles.bottomSectionLabel}>{label}</div>
        {children}
    </div>
);
