import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = ComponentPropsWithoutRef<'ul'>;

export const Box = ({ className, children, ...remain }: BoxProps) => (
    <ul {...remain} className={classNames(styles.list, className)}>
        {children}
    </ul>
);
