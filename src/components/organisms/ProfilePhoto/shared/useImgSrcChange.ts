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
        setImgSrc(url ?? null);
        onClear();
    }, [photoFile, url, onClear]);
    return [imgSrc, setImgSrc] as const;
};
