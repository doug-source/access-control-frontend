import { type RegisterRequestMaker } from '@/shared/types/Contracts/Guest/RegisterRequestMaker';
import { createContext } from 'react';

export const RegisterRequestMakerContext =
    createContext<RegisterRequestMaker | null>(null);
