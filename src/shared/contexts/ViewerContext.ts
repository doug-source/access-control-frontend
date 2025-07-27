import { type Viewer } from '@/shared/types/Contracts/Viewer';
import { createContext } from 'react';

export const ViewerContext = createContext<Viewer | null>(null);
