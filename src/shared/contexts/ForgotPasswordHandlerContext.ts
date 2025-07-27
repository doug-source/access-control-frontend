import { type ForgotPasswordHandler } from '@/shared/types/Contracts/Guest/ForgotPasswordHandler';
import { createContext } from 'react';

export const ForgotPasswordHandlerContext =
    createContext<ForgotPasswordHandler | null>(null);
