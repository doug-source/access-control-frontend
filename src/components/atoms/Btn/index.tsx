import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Btn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

export const Btn = ({ className, children, ...remain }: BtnProps) => (
    <button {...remain} className={classNames(styles.btn, className)}>
        {children}
    </button>
);
