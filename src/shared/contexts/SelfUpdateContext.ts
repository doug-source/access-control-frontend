import type { SelfUpdate } from '@/shared/types/Contracts/SelfUpdater';
import { createContext } from 'react';

export const SelfUpdateContext = createContext<SelfUpdate | null>(null);
