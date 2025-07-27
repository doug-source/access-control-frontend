import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './Input.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...remain }, ref) => (
        <input
            {...remain}
            ref={ref}
            className={classNames(styles.inputFilterIn, className)}
            type="text"
        />
    )
);
