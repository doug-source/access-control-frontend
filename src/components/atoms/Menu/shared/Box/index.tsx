import type { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = PropsWithShow<ComponentPropsWithRef<'ul'>>;

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
