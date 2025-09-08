import type { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import { DotsLoader } from '../DotsLoader';
import styles from './PaginationPurpose.module.scss';

type BaseProps = Omit<ComponentPropsWithRef<'div'>, 'children'>;
interface PaginationPurposeProps extends BaseProps {
    label?: string;
    value?: string;
}

export const PaginationPurpose = ({
    show,
    className,
    label,
    value,
    ...remain
}: PropsWithShow<PaginationPurposeProps, true>) => {
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

PaginationPurpose.Fallback = ({
    className,
    label,
    ...remain
}: BaseProps & { label: string }) => (
    <article
        {...remain}
        className={classNames(styles.purposeArticle, className)}
    >
        <div>{label}</div>
        <div>
            <DotsLoader />
        </div>
    </article>
);
