import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Item.module.scss';

type ItemProps = ComponentPropsWithRef<'li'>;

export const Item = ({ className, children, ...remain }: ItemProps) => (
    <li {...remain} className={classNames(styles.listItem, className)}>
        {children}
    </li>
);
