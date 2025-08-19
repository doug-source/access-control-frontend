import { RefObject, useId } from 'react';
import { usePhotoHandler } from './usePhotoHandler';

export const useDeps = (
    setFile: (val: File | null) => void,
    inputRef?: RefObject<HTMLInputElement | null>
) => {
    const hookArgs = usePhotoHandler(setFile, inputRef);
    const idPhotoBox = useId();
    const idPhotoInput = useId();

    return {
        ...hookArgs,
        idPhotoBox,
        idPhotoInput,
    };
};
