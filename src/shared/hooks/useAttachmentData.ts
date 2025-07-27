import { AttachmentDataContext } from '@/shared/contexts/AttachmentDataContext';
import { useContext } from 'react';

export const useAttachmentData = () => useContext(AttachmentDataContext);
