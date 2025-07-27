import { usePhotoFile } from '@/shared/hooks/usePhotoFile';
import { useId } from 'react';
import { usePhotoHandler } from './usePhotoHandler';

export const useDeps = () => {
    const photoHandler = usePhotoHandler();
    const photoFile = usePhotoFile();
    const idPhotoBox = useId();
    const idPhotoInput = useId();

    return {
        photoHandler,
        photoFile,
        idPhotoBox,
        idPhotoInput,
    };
};
