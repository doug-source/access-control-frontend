import { type WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { type ComponentPropsWithoutRef } from 'react';
import styles from './Backdrop.module.scss';

type BackdropProps = WithShow<ComponentPropsWithoutRef<'div'>, true>;

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
