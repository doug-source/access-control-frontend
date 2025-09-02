import type { WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './PaginationPurpose.module.scss';

interface PaginationPurposeProps
    extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    label?: string;
    value?: string;
}

export const PaginationPurpose = ({
    show,
    className,
    label,
    value,
    ...remain
}: WithShow<PaginationPurposeProps, true>) => {
    if (!show) {
        return null;
    }
    return (
        <article
            {...remain}
            className={classNames(styles.purposeArticle, className)}
        >
            <div>{label}</div>
            <div>{value}</div>
        </article>
    );
};
