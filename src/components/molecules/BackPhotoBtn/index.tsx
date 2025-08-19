import { BackPhotoIcon } from '@/components/atoms/icons/BackPhotoIcon';
import type { WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { useId } from 'react';
import styles from './BackPhotoBtn.module.scss';

interface BackPhotoBtnProps extends WithShow<unknown, true> {
    className?: string;
    onClick(): void;
}

export const BackPhotoBtn = ({
    show,
    className,
    onClick,
}: BackPhotoBtnProps) => {
    const backBtnId = useId();
    if (!show) {
        return null;
    }
    return (
        <button
            type="button"
            className={classNames(styles.backPhotoBtn, className)}
            aria-describedby={backBtnId}
            onClick={onClick}
        >
            <BackPhotoIcon />
            <span id={backBtnId} className="screen-reader-only">
                Botão para desfazer a mudança de foto
            </span>
        </button>
    );
};
