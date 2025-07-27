import { DetachmentDataContext } from '@/shared/contexts/DetachmentDataContext';
import { useContext } from 'react';

export const useDetachmentData = () => useContext(DetachmentDataContext);
