import { useEffect, useState } from 'react';

export const useImgSrcChange = (url: string | null, chosenFile: boolean) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    useEffect(() => {
        if (chosenFile) {
            return;
        }
        setImgSrc(url ?? null);
    }, [chosenFile, url]);
    return [imgSrc, setImgSrc] as const;
};
