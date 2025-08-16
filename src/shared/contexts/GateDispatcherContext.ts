import type { GateDispatcher } from '@/shared/types/Contracts/GateDispatcher';
import { createContext } from 'react';

export const GateDispatcherContext = createContext<GateDispatcher | null>(null);
