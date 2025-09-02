import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './VerticalCardBox.module.scss';

type VerticalCardBoxProps = ComponentPropsWithRef<'div'>;

export const VerticalCardBox = memo(
    ({ className, children, ...remain }: VerticalCardBoxProps) => (
        <div
            {...remain}
            className={classNames(styles.verticalCardBox, className)}
        >
            {children}
        </div>
    )
);
