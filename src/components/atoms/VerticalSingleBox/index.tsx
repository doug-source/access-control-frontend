import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './VerticalSingleBox.module.scss';

type VerticalSingleBoxProps = ComponentPropsWithRef<'div'>;

export const VerticalSingleBox = memo(
    ({ children, ...remain }: VerticalSingleBoxProps) => (
        <div {...remain} className={classNames(styles.verticalSingleBox)}>
            {children}
        </div>
    )
);
