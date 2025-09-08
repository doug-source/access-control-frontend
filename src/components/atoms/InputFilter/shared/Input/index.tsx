import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';
import styles from './Input.module.scss';
import { useDefaultValueChange } from './shared/useDefaultValueChange';

type InputProps = ComponentPropsWithRef<'input'>;

export const Input = ({
    className,
    defaultValue,
    ref,
    ...remain
}: InputProps) => {
    const [value, setValue] = useDefaultValueChange(defaultValue);
    return (
        <input
            {...remain}
            ref={ref}
            className={classNames(styles.inputFilterIn, className)}
            type="text"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
        />
    );
};
