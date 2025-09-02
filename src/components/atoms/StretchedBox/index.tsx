import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './StretchedBox.module.scss';

type StretchedBoxProps = ComponentPropsWithRef<'div'>;

export const StretchedBox = ({
    className,
    children,
    ...remain
}: StretchedBoxProps) => (
    <div {...remain} className={classNames(styles.stretchedBox, className)}>
        {children}
    </div>
);
