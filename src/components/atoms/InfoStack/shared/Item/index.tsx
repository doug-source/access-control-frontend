import type { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Item.module.scss';

interface ItemProps extends ComponentPropsWithRef<'div'> {
    header?: boolean;
}

export const Item = ({
    header,
    show = true,
    className,
    children,
    ...remain
}: PropsWithShow<ItemProps>) => {
    if (!show) {
        return null;
    }
    return (
        <div
            {...remain}
            className={classNames(
                styles.item,
                header && styles.header,
                className
            )}
        >
            {children}
        </div>
    );
};
