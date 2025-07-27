import { type RestorationDataProvided } from '@/shared/contexts/types/RestorationDataProvided';
import { createContext } from 'react';

export const RestorationDataContext =
    createContext<RestorationDataProvided | null>(null);
