import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './SubmitRow.module.scss';

type SubmitRowProps = ComponentPropsWithoutRef<'div'>;

export const SubmitRow = ({
    className,
    children,
    ...remain
}: SubmitRowProps) => (
    <div {...remain} className={classNames(styles.submitRow, className)}>
        {children}
    </div>
);
