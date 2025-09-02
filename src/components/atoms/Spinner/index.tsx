import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Spinner.module.scss';

type SpinnerProps = ComponentPropsWithRef<'span'>;

export const Spinner = ({ className, ...remain }: SpinnerProps) => (
    <span {...remain} className={classNames(styles.loader, className)}></span>
);
