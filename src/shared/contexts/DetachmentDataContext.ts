import { type DetachmentDataProvided } from '@/shared/contexts/types/DetachmentDataProvided';
import { createContext } from 'react';

export const DetachmentDataContext =
    createContext<DetachmentDataProvided | null>(null);
