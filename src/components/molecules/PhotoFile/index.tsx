import { FieldGroup } from '@/components/atoms/FieldGroup';
import { UploadIcon } from '@/components/atoms/icons/UploadIcon';
import { type ForwardedRef } from 'react';
import styles from './PhotoFile.module.scss';
import { useDeps } from './shared/useDeps';

interface PhotoFileProps {
    inputRef: ForwardedRef<HTMLInputElement>;
}

export const PhotoFile = ({ inputRef }: PhotoFileProps) => {
    const { idPhotoBox, idPhotoInput, photoFile, photoHandler } = useDeps();
    return (
        <div className={styles.box} aria-describedby={idPhotoBox}>
            <UploadIcon />
            <h3 className={styles.heading} id={idPhotoBox}>
                {photoFile?.name ?? 'Clique na caixa para upload'}
            </h3>
            <label htmlFor={idPhotoInput} className="screen-reader-only">
                Input da foto do usuário
            </label>
            <FieldGroup.Input
                type="file"
                name="photo"
                ref={inputRef}
                onChange={photoHandler}
                className={styles.inputFile}
                id={idPhotoInput}
            />
        </div>
    );
};
