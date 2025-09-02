import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './VerticalCardBox.module.scss';

type VerticalCardBoxProps = ComponentPropsWithoutRef<'div'>;

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
