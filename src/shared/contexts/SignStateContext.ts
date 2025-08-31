import type { SignState } from '@/shared/types/Reducers/Sign';
import { createContext } from 'react';

export const SignStateContext = createContext<SignState | null>(null);
