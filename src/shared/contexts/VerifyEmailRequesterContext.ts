import { type VerifyEmailRequester } from '@/shared/types/Contracts/VerifyEmailRequester';
import { createContext } from 'react';

export const VerifyEmailRequesterContext =
    createContext<VerifyEmailRequester | null>(null);
