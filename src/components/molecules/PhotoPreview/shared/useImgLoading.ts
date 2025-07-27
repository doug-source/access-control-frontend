import { useCallback, useEffect, useRef, useState } from 'react';

export const useImgLoading = () => {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const onLoad = useCallback(() => setLoaded(true), [setLoaded]);
    useEffect(() => {
        if (loaded || !imgRef.current?.complete) {
            return;
        }
        onLoad();
    }, [imgRef, loaded, onLoad]);
    return { loaded, onLoad, imgRef };
};
