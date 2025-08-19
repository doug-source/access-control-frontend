import { PhotoFileRefContext } from '@/shared/contexts/PhotoFileRefContext';
import { useContext } from 'react';

export const usePhotoFileRef = () => {
    const ref = useContext(PhotoFileRefContext);
    if (ref === null) {
        throw new Error('PhotoFileRef invalid');
    }
    return ref;
};
