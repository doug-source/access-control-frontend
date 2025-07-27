import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Divisor.module.scss';

type DivisorProps = ComponentPropsWithoutRef<'div'>;

export const Divisor = ({ children, className, ...remain }: DivisorProps) => (
    <div {...remain} className={classNames(styles.divisorBox, className)}>
        <hr />
        <div>{children}</div>
        <hr />
    </div>
);
