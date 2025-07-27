import classNames from 'classnames';
import { type ReactNode } from 'react';
import styles from './PhotoPreview.module.scss';
import { SpinnerPhoto } from './shared/SpinnerPhoto';
import { useDeps } from './shared/useDeps';

interface PhotoPreviewProps {
    src: string | null;
    fallback: ReactNode;
}

export const PhotoPreview = ({ src, fallback }: PhotoPreviewProps) => {
    const { loaded, onLoad, imgRef } = useDeps();
    if (src === null) {
        return <div className={styles.box}>{fallback}</div>;
    }
    return (
        <div className={styles.box}>
            <SpinnerPhoto show={!loaded} className={styles.loading} />
            <img
                className={classNames(
                    styles.photo,
                    !loaded && styles.photoLoading
                )}
                ref={imgRef}
                src={src}
                alt="photo do usuário"
                onLoad={() => onLoad()}
            />
        </div>
    );
};
