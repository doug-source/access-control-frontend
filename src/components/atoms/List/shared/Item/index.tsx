import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Item.module.scss';

type ItemProps = ComponentPropsWithoutRef<'li'>;

export const Item = ({ className, children, ...remain }: ItemProps) => (
    <li {...remain} className={classNames(styles.listItem, className)}>
        {children}
    </li>
);
