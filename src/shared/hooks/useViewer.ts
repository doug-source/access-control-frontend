import { useContext } from 'react';
import { ViewerContext } from '../contexts/ViewerContext';

export const useViewer = () => {
    const viewer = useContext(ViewerContext);
    if (viewer === null) {
        throw new Error('Invalid Viewer!');
    }
    return viewer;
};
