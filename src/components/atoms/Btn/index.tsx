import classNames from 'classnames';
import { memo, type ComponentPropsWithRef } from 'react';
import styles from './Btn.module.scss';

type BtnProps = ComponentPropsWithRef<'button'>;

export const Btn = memo(({ className, children, ...remain }: BtnProps) => (
    <button {...remain} className={classNames(styles.btn, className)}>
        {children}
    </button>
));
