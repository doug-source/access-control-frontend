import { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './BtnRow.module.scss';
import { useDeps } from './shared/useDeps';

interface BtnRowProps extends ComponentPropsWithRef<'button'> {
    description: string;
}

export const BtnRow = ({
    type = 'button',
    show = true,
    className,
    children,
    description,
    ...remain
}: PropsWithShow<BtnRowProps>) => {
    const id = useDeps();
    if (!show) {
        return null;
    }
    return (
        <button
            {...remain}
            type={type}
            className={classNames(styles.iconBtn, className)}
            aria-describedby={id}
        >
            {children}
            <span id={id} className="screen-reader-only">
                {description}
            </span>
        </button>
    );
};
