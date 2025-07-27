import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './VerticalCardBox.module.scss';

type VerticalCardBoxProps = ComponentPropsWithoutRef<'div'>;

export const VerticalCardBox = ({
    className,
    children,
    ...remain
}: VerticalCardBoxProps) => (
    <div {...remain} className={classNames(styles.verticalCardBox, className)}>
        {children}
    </div>
);
