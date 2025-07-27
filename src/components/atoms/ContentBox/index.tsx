import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './ContentBox.module.scss';

type ContentBoxProps = ComponentPropsWithoutRef<'div'>;

export const ContentBox = ({
    className,
    children,
    ...remain
}: ContentBoxProps) => (
    <div {...remain} className={classNames(styles.contentBox, className)}>
        {children}
    </div>
);
