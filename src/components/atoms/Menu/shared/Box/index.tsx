import { type WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = WithShow<ComponentPropsWithoutRef<'ul'>>;

export const Box = ({
    show = true,
    className,
    children,
    ...remain
}: BoxProps) => {
    if (!show) {
        return null;
    }
    return (
        <ul {...remain} className={classNames(styles.box, className)}>
            {children}
        </ul>
    );
};
