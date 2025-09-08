import type { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Item.module.scss';

type ItemProps = PropsWithShow<ComponentPropsWithRef<'li'>>;

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
