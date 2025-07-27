import { useEffect, useState } from 'react';

export const useImgSrcChange = (
    url: string | null,
    photoFile: File | null,
    onClear: () => void
) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    useEffect(() => {
        if (photoFile) {
            return;
        }
        const host = import.meta.env.VITE_HOST as string;
        setImgSrc(url ? `${host}/storage/app/${url}` : null);
        onClear();
    }, [photoFile, url, onClear]);
    return [imgSrc, setImgSrc] as const;
};
