import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './VerticalSingleBox.module.scss';

type VerticalSingleBoxProps = ComponentPropsWithoutRef<'div'>;

export const VerticalSingleBox = ({
    children,
    ...remain
}: VerticalSingleBoxProps) => (
    <div {...remain} className={classNames(styles.verticalSingleBox)}>
        {children}
    </div>
);
