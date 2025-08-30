import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';
import styles from './DotsLoader.module.scss';

type DotsLoaderProps = ComponentPropsWithRef<'div'>;

export const DotsLoader = ({
    className,
    children,
    ...remain
}: DotsLoaderProps) => (
    <div {...remain} className={classNames(styles.loader, className)}>
        {children}
    </div>
);
