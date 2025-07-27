import { PhotoFileContext } from '@/shared/contexts/PhotoFileContext';
import { useContext } from 'react';

export const usePhotoFile = () => useContext(PhotoFileContext);
