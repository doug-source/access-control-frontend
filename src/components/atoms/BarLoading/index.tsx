import classNames from 'classnames';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './BarLoading.module.scss';

type BarLoadingProps = ComponentPropsWithoutRef<'div'>;

export const BarLoading = ({ className, ...remain }: BarLoadingProps) => (
    <div {...remain} className={classNames(styles.barLoading, className)} />
);
