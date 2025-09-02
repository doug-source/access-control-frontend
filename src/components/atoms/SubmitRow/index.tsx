import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './SubmitRow.module.scss';

type SubmitRowProps = ComponentPropsWithRef<'div'>;

export const SubmitRow = memo(
    ({ className, children, ...remain }: SubmitRowProps) => (
        <div {...remain} className={classNames(styles.submitRow, className)}>
            {children}
        </div>
    )
);
