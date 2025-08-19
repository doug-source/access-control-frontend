import type { FormDispatcher } from '@/shared/types/Contracts/FormDispatcher';
import type { DeclareErrorHandler } from '@/shared/types/Responsabilities/LogicBase';
import type { LogicBaseStates } from '@/shared/types/Responsabilities/States';
import { createContext } from 'react';

export const LogicBaseContext = createContext<{
    dispatcher: FormDispatcher<LogicBaseStates>;
    errorHandler: DeclareErrorHandler;
} | null>(null);
