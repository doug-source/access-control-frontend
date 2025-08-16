import { createContext } from 'react';
import { LoginErrorHandler } from '../adapters/LoginErrorHandler';

export const LoginErrorHandlerContext = createContext<LoginErrorHandler | null>(
    null
);
