import { type AttachmentDataProvided } from '@/shared/contexts/types/AttachmentDataProvided';
import { createContext } from 'react';

export const AttachmentDataContext =
    createContext<AttachmentDataProvided | null>(null);
