import type { SignOutDispatcher } from '@/shared/types/Contracts/LogoutDispatcher';
import { createContext } from 'react';

export const UnauthenticatorContext = createContext<SignOutDispatcher | null>(
    null
);
