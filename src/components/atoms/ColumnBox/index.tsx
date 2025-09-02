import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './ColumnBox.module.scss';

type ColumnBoxProps = ComponentPropsWithRef<'div'>;

export const ColumnBox = ({
    className,
    children,
    ...remain
}: ColumnBoxProps) => (
    <div {...remain} className={classNames(styles.columnBox, className)}>
        {children}
    </div>
);
