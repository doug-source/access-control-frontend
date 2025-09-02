import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './FiltersBlock.module.scss';

type FiltersBlockProps = ComponentPropsWithRef<'div'>;

export const FiltersBlock = ({ className, children }: FiltersBlockProps) => (
    <div className={classNames(styles.filtersBlock, className)}>{children}</div>
);
