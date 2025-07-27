import { BackPhotoBtn } from '@/components/molecules/BackPhotoBtn';
import { PhotoFile } from '@/components/molecules/PhotoFile';
import { PhotoPreview } from '@/components/molecules/PhotoPreview';
import {
    type ComponentPropsWithoutRef,
    forwardRef,
    type ReactNode,
} from 'react';
import styles from './ProfilePhoto.module.scss';
import { useDeps } from './shared/useDeps';

interface ProfilePhotoProps extends ComponentPropsWithoutRef<'div'> {
    url: string | null;
    fallback: ReactNode;
}

export const ProfilePhoto = forwardRef<HTMLInputElement, ProfilePhotoProps>(
    ({ url, fallback, ...remain }, ref) => {
        const { photoInputRef, photoFile, fileInputKey, imgSrc } = useDeps(url);

        return (
            <div {...remain} className={styles.box}>
                <BackPhotoBtn
                    photoInputRef={photoInputRef}
                    show={Boolean(photoFile?.name)}
                />
                <PhotoPreview src={imgSrc} fallback={fallback} />
                <PhotoFile key={fileInputKey} inputRef={ref} />
            </div>
        );
    }
);
