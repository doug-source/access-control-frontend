import { type RemotionDataProvided } from '@/shared/contexts/types/RemotionDataProvided';
import { createContext } from 'react';

export const RemotionDataContext = createContext<RemotionDataProvided | null>(
    null
);
