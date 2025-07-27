import { type WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Item.module.scss';

type ItemProps = WithShow<
    ComponentPropsWithoutRef<'div'> & {
        header?: boolean;
    }
>;

export const Item = ({
    header,
    show = true,
    className,
    children,
    ...remain
}: ItemProps) => {
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
