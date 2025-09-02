import { memo, type ComponentPropsWithRef } from 'react';
import styles from './CustomForm.module.scss';

type CustomFormProps = ComponentPropsWithRef<'form'>;

export const CustomForm = memo(({ children, ...remain }: CustomFormProps) => (
    <form {...remain} className={styles.customForm} name="customForm">
        {children}
    </form>
));
