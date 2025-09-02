import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = ComponentPropsWithRef<'div'>;

export const Box = memo(({ className, children, ...remain }: BoxProps) => (
    <div {...remain} className={classNames(styles.fieldGroup, className)}>
        {children}
    </div>
));
