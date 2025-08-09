import { BackPhotoBtn } from '@/components/molecules/BackPhotoBtn';
import { PhotoFile } from '@/components/molecules/PhotoFile';
import { PhotoPreview } from '@/components/molecules/PhotoPreview';
import { type ComponentPropsWithRef, type ReactNode } from 'react';
import styles from './ProfilePhoto.module.scss';
import { useDeps } from './shared/useDeps';

interface ProfilePhotoProps extends Omit<ComponentPropsWithRef<'div'>, 'ref'> {
    url: string | null;
    fallback: ReactNode;
    ref?: ComponentPropsWithRef<'input'>['ref'];
}

export const ProfilePhoto = ({
    url,
    fallback,
    ref,
    ...remain
}: ProfilePhotoProps) => {
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
};
