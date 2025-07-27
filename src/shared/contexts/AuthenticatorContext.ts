import { Authenticator } from '@/shared/types/Contracts/Authenticator';
import { createContext } from 'react';

export const AuthenticatorContext = createContext<Authenticator | null>(null);
