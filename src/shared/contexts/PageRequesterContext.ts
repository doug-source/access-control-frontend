import { type PageRequester } from '@/shared/types/Contracts/PageRequester';
import { createContext } from 'react';

export const PageRequesterContext = createContext<PageRequester | null>(null);
