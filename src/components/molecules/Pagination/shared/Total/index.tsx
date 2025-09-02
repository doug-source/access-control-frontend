import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Total.module.scss';

interface TotalProps extends ComponentPropsWithRef<'div'> {
    label?: string;
    value: number;
}

export const Total = ({
    className,
    label = 'Total',
    value,
    ...remain
}: TotalProps) => (
    <div {...remain} className={classNames(styles.paginationTotal, className)}>
        {label}: {value}
    </div>
);
