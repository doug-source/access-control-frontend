import { type ApprovementDataProvided } from '@/shared/contexts/types/ApprovementDataProvided';
import { createContext } from 'react';

export const ApprovementDataContext =
    createContext<ApprovementDataProvided | null>(null);
