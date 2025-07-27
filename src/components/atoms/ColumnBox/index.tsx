import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ColumnBox.module.scss';

type ColumnBoxProps = ComponentPropsWithoutRef<'div'>;

export const ColumnBox = ({
    className,
    children,
    ...remain
}: ColumnBoxProps) => (
    <div {...remain} className={classNames(styles.columnBox, className)}>
        {children}
    </div>
);
