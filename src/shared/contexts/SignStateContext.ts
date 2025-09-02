import type { SignAction, SignState } from '@/shared/types/Reducers/Sign';
import { ActionDispatch, createContext } from 'react';

export const SignStateContext = createContext<{
    state: SignState;
    dispatch: ActionDispatch<[action: SignAction]>;
} | null>(null);
