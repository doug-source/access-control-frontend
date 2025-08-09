import classNames from 'classnames';
import { type ComponentPropsWithRef } from 'react';
import styles from './Input.module.scss';

type InputProps = ComponentPropsWithRef<'input'> & {
    blurred?: boolean;
};

export const Input = ({
    blurred = false,
    className,
    ref,
    ...remain
}: InputProps) => (
    <input
        {...remain}
        ref={ref}
        className={classNames(
            styles.fieldInput,
            blurred && styles.blurred,
            className
        )}
    />
);
