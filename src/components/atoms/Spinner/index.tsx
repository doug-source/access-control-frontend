import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Spinner.module.scss';

type SpinnerProps = ComponentPropsWithoutRef<'span'>;

export const Spinner = ({ className, ...remain }: SpinnerProps) => (
    <span {...remain} className={classNames(styles.loader, className)}></span>
);
