import { FieldGroup } from '@/components/atoms/FieldGroup';
import { UploadIcon } from '@/components/atoms/icons/UploadIcon';
import { forwardRef, RefObject, useImperativeHandle } from 'react';
import styles from './PhotoFile.module.scss';
import { useDeps } from './shared/useDeps';

interface PhotoFileHandle {
    clear: ReturnType<typeof useDeps>['clearFile'];
}

interface PhotoFileProps {
    inputRef?: RefObject<HTMLInputElement | null>;
    filePath?: string;
    setFile(file: File | null): void;
}

export const PhotoFile = forwardRef<PhotoFileHandle, PhotoFileProps>(
    ({ inputRef, filePath, setFile }, ref) => {
        const { inputKey, idPhotoBox, idPhotoInput, clearFile, changeHandler } =
            useDeps(setFile, inputRef);

        useImperativeHandle(ref, () => ({
            clear: clearFile,
        }));

        return (
            <div className={styles.box} aria-describedby={idPhotoBox}>
                <UploadIcon />
                <h3 className={styles.heading} id={idPhotoBox}>
                    {filePath ?? 'Clique na caixa para upload'}
                </h3>
                <label htmlFor={idPhotoInput} className="screen-reader-only">
                    Input da foto do usuário
                </label>
                <FieldGroup.Input
                    type="file"
                    name="photo"
                    ref={inputRef}
                    key={inputKey}
                    onChange={changeHandler}
                    className={styles.inputFile}
                    id={idPhotoInput}
                />
            </div>
        );
    }
);
