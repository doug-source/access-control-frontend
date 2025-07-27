import { BackPhotoIcon } from '@/components/atoms/icons/BackPhotoIcon';
import { WithShow } from '@/shared/types/Utils';
import classNames from 'classnames';
import { RefObject } from 'react';
import styles from './BackPhotoBtn.module.scss';
import { useDeps } from './shared/useDeps';

interface BackPhotoBtnProps extends WithShow<unknown, true> {
    photoInputRef: RefObject<HTMLInputElement | null>;
    className?: string;
}

export const BackPhotoBtn = ({
    show,
    photoInputRef,
    className,
}: BackPhotoBtnProps) => {
    const [backBtnId, clickHandler] = useDeps(photoInputRef);
    if (!show) {
        return null;
    }
    return (
        <button
            type="button"
            className={classNames(styles.backPhotoBtn, className)}
            aria-describedby={backBtnId}
            onClick={clickHandler}
        >
            <BackPhotoIcon />
            <span id={backBtnId} className="screen-reader-only">
                Botão para desfazer a mudança de foto
            </span>
        </button>
    );
};
