import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Btn.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

export const Btn = ({ className, children, ...remain }: BtnProps) => (
    <button
        {...remain}
        type="button"
        className={classNames(styles.inputFilterBtn, className)}
    >
        {children}
    </button>
);
