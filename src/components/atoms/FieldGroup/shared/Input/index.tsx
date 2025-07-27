import classNames from 'classnames';
import { type ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './Input.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'> & {
    blurred?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ blurred = false, className, ...remain }, ref) => (
        <input
            {...remain}
            ref={ref}
            className={classNames(
                styles.fieldInput,
                blurred && styles.blurred,
                className
            )}
        />
    )
);
