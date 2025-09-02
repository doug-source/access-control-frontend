import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = ComponentPropsWithRef<'div'>;

export const Box = ({ className, children, ...remain }: BoxProps) => (
    <div {...remain} className={classNames(styles.paginationBox, className)}>
        {children}
    </div>
);
