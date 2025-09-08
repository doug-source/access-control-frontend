import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './Base.module.scss';

export const Base = memo(
    ({ className, children, ...remain }: ComponentPropsWithRef<'button'>) => (
        <button {...remain} className={classNames(styles.btn, className)}>
            {children}
        </button>
    )
);
