import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Btn.module.scss';

type BtnProps = ComponentPropsWithRef<'button'>;

export const Btn = ({ className, children, ...remain }: BtnProps) => (
    <button
        {...remain}
        type="button"
        className={classNames(styles.inputFilterBtn, className)}
    >
        {children}
    </button>
);
