import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './ContentBox.module.scss';

type ContentBoxProps = ComponentPropsWithRef<'div'>;

export const ContentBox = memo(
    ({ className, children, ...remain }: ContentBoxProps) => (
        <div {...remain} className={classNames(styles.contentBox, className)}>
            {children}
        </div>
    )
);
