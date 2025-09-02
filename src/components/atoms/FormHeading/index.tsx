import { memo, type ComponentPropsWithRef } from 'react';
import styles from './FormHeading.module.scss';

type FormHeadingProps = ComponentPropsWithRef<'h1'>;

export const FormHeading = memo(({ children, ...remain }: FormHeadingProps) => (
    <h1 {...remain} className={styles.heading}>
        {children}
    </h1>
));
