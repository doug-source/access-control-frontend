import { type SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import { createContext } from 'react';

export const SuperAdminCreatorContext = createContext<SuperAdminCreator | null>(
    null
);
