import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './VerticalSingleBox.module.scss';

type VerticalSingleBoxProps = ComponentPropsWithoutRef<'div'>;

export const VerticalSingleBox = memo(
    ({ children, ...remain }: VerticalSingleBoxProps) => (
        <div {...remain} className={classNames(styles.verticalSingleBox)}>
            {children}
        </div>
    )
);
