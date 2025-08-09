import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';
import styles from './Input.module.scss';

type InputProps = ComponentPropsWithRef<'input'>;

export const Input = ({ className, ref, ...remain }: InputProps) => (
    <input
        {...remain}
        ref={ref}
        className={classNames(styles.inputFilterIn, className)}
        type="text"
    />
);
