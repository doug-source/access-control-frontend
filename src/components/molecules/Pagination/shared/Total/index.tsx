import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Total.module.scss';

type TotalProps = ComponentPropsWithoutRef<'div'> & {
    label?: string;
    value: number;
};

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
