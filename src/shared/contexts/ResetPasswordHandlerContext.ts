import { type ResetPasswordHandler } from '@/shared/types/Contracts/Guest/ResetPasswordHandler';
import { createContext } from 'react';

export const ResetPasswordHandlerContext =
    createContext<ResetPasswordHandler | null>(null);
