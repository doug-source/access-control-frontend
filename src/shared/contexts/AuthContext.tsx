import { type AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import { createContext } from 'react';

export const AuthContext = createContext<AuthContextProvided | null>(null);
