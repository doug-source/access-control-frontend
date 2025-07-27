import { WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './PaginationPurpose.module.scss';

type PaginationPurposeProps = WithShow<
    Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
        label?: string;
        value?: string;
    },
    true
>;

export const PaginationPurpose = ({
    show,
    className,
    label,
    value,
    ...remain
}: PaginationPurposeProps) => {
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
