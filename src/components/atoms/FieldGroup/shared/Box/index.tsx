import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = ComponentPropsWithoutRef<'div'>;

export const Box = ({ className, children, ...remain }: BoxProps) => (
    <div {...remain} className={classNames(styles.fieldGroup, className)}>
        {children}
    </div>
);
