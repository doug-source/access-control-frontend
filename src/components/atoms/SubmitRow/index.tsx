import classNames from 'classnames';
import { memo, type ComponentPropsWithoutRef } from 'react';
import styles from './SubmitRow.module.scss';

type SubmitRowProps = ComponentPropsWithoutRef<'div'>;

export const SubmitRow = memo(
    ({ className, children, ...remain }: SubmitRowProps) => (
        <div {...remain} className={classNames(styles.submitRow, className)}>
            {children}
        </div>
    )
);
