import { type PageRequesterWithRestore } from '@/shared/types/Contracts/PageRequesterWithRestore';
import { createContext } from 'react';

export const PageRequesterWithRestoreContext =
    createContext<PageRequesterWithRestore | null>(null);
