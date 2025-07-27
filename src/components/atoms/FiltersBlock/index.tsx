import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './FiltersBlock.module.scss';

type FiltersBlockProps = ComponentPropsWithoutRef<'div'>;

export const FiltersBlock = ({ className, children }: FiltersBlockProps) => (
    <div className={classNames(styles.filtersBlock, className)}>{children}</div>
);
