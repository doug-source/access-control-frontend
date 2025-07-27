import { type ComponentPropsWithoutRef } from 'react';
import styles from './FormHeading.module.scss';

type FormHeadingProps = ComponentPropsWithoutRef<'h1'>;

export const FormHeading = ({ children, ...remain }: FormHeadingProps) => (
    <h1 {...remain} className={styles.heading}>
        {children}
    </h1>
);
