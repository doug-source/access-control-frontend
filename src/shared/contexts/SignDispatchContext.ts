import type { SignAction } from '@/shared/types/Reducers/Sign';
import { type ActionDispatch, createContext } from 'react';

export const SignDispatchContext = createContext<ActionDispatch<
    [action: SignAction]
> | null>(null);
