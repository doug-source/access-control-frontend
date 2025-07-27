import { usePhotoFile } from '@/shared/hooks/usePhotoFile';
import { useCallback, useRef, useState } from 'react';
import { useImgSrcChange } from './useImgSrcChange';
import { usePhotoFileChange } from './usePhotoFileChange';

export const useDeps = (url: string | null) => {
    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const photoFile = usePhotoFile();
    // const [fileInputKey] = useState(Date.now());
    const [fileInputKey, setFileInputKey] = useState(Date.now());
    const onClear = useCallback(
        () => setFileInputKey(Date.now()),
        [setFileInputKey]
    );
    const [imgSrc, setImgSrc] = useImgSrcChange(url, photoFile, onClear);
    usePhotoFileChange(photoFile, setImgSrc);
    return { photoInputRef, photoFile, fileInputKey, imgSrc };
};
