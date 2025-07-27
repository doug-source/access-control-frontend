import { type WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Item.module.scss';

type ItemProps = WithShow<ComponentPropsWithoutRef<'li'>>;

export const Item = ({
    show = true,
    className,
    children,
    ...remain
}: ItemProps) => {
    if (!show) {
        return null;
    }
    return (
        <li {...remain} className={classNames(styles.item, className)}>
            {children}
        </li>
    );
};
