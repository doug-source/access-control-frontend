import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './StretchedBox.module.scss';

type StretchedBoxProps = ComponentPropsWithoutRef<'div'>;

export const StretchedBox = ({
    className,
    children,
    ...remain
}: StretchedBoxProps) => (
    <div {...remain} className={classNames(styles.stretchedBox, className)}>
        {children}
    </div>
);
