import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './ContentBox.module.scss';

type ContentBoxProps = ComponentPropsWithoutRef<'div'>;

export const ContentBox = memo(
    ({ className, children, ...remain }: ContentBoxProps) => (
        <div {...remain} className={classNames(styles.contentBox, className)}>
            {children}
        </div>
    )
);
