import { type PageRequesterWithApprove } from '@/shared/types/Contracts/PageRequesterWithApprove';
import { createContext } from 'react';

export const PageRequesterWithApproveContext =
    createContext<PageRequesterWithApprove | null>(null);
