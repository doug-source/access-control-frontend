import { usePhotoFileRef } from '@/shared/hooks/usePhotoFileRef';
import { useRef, useState } from 'react';
import { useImgSrcChange } from './useImgSrcChange';
import { usePhotoFileChange } from './usePhotoFileChange';

export const useDeps = (url: string | null) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const clearFileRef = usePhotoFileRef();
    const backHandle = () => {
        const { current: photoFileState } = clearFileRef;
        if (photoFileState === null) {
            return;
        }
        photoFileState.clear();
        setFile(null);
    };

    const [imgSrc, setImgSrc] = useImgSrcChange(url, Boolean(file));
    usePhotoFileChange(file, setImgSrc);

    return {
        inputRef,
        filePath: file?.name,
        setFile,
        clearFileRef,
        backHandle,
        imgSrc,
    };
};
