import { ViewerContext } from '@/shared/contexts/ViewerContext';
import { useContext } from 'react';

export const useViewer = () => {
    const viewer = useContext(ViewerContext);
    if (viewer === null) {
        throw new Error('Invalid Viewer!');
    }
    return viewer;
};
