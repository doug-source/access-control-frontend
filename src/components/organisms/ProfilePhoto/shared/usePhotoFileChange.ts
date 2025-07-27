import { useEffect } from 'react';

export const usePhotoFileChange = (
    photoFile: File | null,
    onChange: (path: string) => void
) => {
    useEffect(() => {
        let isCancel = false;
        if (!photoFile) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(photoFile);
        reader.addEventListener('loadend', () => {
            if (
                !photoFile.name.match(/\.(jpe?g|png)$/) ||
                typeof reader.result !== 'string' ||
                isCancel
            ) {
                return;
            }
            onChange(reader.result);
        });
        return () => {
            isCancel = true;
            if (reader?.readyState === 1) {
                reader.abort();
            }
        };
    }, [photoFile, onChange]);
};
