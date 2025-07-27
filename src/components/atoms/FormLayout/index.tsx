import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './FormLayout.module.scss';

type FormLayoutProps = ComponentPropsWithoutRef<'div'>;

export const FormLayout = ({
    className,
    children,
    ...remain
}: FormLayoutProps) => (
    <div {...remain} className={classNames(className, styles.formLayout)}>
        {children}
    </div>
);
