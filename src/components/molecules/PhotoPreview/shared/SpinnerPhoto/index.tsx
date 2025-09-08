import { BarLoading } from '@/components/atoms/BarLoading';
import { PropsWithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import type { ComponentPropsWithRef } from 'react';
import styles from './SpinnerPhoto.module.scss';

type SpinnerPhotoProps = PropsWithShow<
    ComponentPropsWithRef<typeof BarLoading>,
    true
>;

export const SpinnerPhoto = ({
    show,
    className,
    ...remain
}: SpinnerPhotoProps) => {
    if (!show) {
        return null;
    }
    return (
        <BarLoading
            {...remain}
            className={classNames(styles.spinnerPhoto, className)}
        />
    );
};
