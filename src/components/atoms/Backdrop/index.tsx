import type { WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './Backdrop.module.scss';

type BackdropProps = WithShow<ComponentPropsWithRef<'div'>, true>;

export const Backdrop = ({
    show,
    className,
    children,
    ...remain
}: BackdropProps) => {
    if (!show) {
        return null;
    }
    return (
        <div {...remain} className={classNames(className, styles.backdrop)}>
            {children}
        </div>
    );
};
