import { createContext, type RefObject } from 'react';

export const InputRefContext =
    createContext<RefObject<HTMLInputElement | null> | null>(null);
