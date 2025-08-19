import { BackPhotoBtn } from '@/components/molecules/BackPhotoBtn';
import { PhotoFile } from '@/components/molecules/PhotoFile';
import { PhotoPreview } from '@/components/molecules/PhotoPreview';
import { type ComponentPropsWithRef, type ReactNode } from 'react';
import styles from './ProfilePhoto.module.scss';
import { useDeps } from './shared/useDeps';

interface ProfilePhotoProps extends Omit<ComponentPropsWithRef<'div'>, 'ref'> {
    url: string | null;
    fallback: ReactNode;
}

export const ProfilePhoto = ({
    url,
    fallback,
    ...remain
}: ProfilePhotoProps) => {
    const { inputRef, filePath, setFile, clearFileRef, backHandle, imgSrc } =
        useDeps(url);

    return (
        <div {...remain} className={styles.box}>
            <BackPhotoBtn show={Boolean(filePath)} onClick={backHandle} />
            <PhotoPreview src={imgSrc} fallback={fallback} />

            <PhotoFile
                ref={clearFileRef}
                inputRef={inputRef}
                filePath={filePath}
                setFile={setFile}
            />
        </div>
    );
};
