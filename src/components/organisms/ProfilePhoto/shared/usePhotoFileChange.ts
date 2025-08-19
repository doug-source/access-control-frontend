import { useEffect } from 'react';

export const usePhotoFileChange = (
    file: File | null,
    onChange: (path: string) => void
) => {
    useEffect(() => {
        let isCancel = false;
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('loadend', () => {
            if (
                !file.name.match(/\.(jpe?g|png)$/) ||
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
    }, [file, onChange]);
};
