import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './BarLoading.module.scss';

type BarLoadingProps = ComponentPropsWithRef<'div'>;

export const BarLoading = ({ className, ...remain }: BarLoadingProps) => (
    <div {...remain} className={classNames(styles.barLoading, className)} />
);
