import type { ActionDispatchList } from '@/shared/types/Reducers/ActionsList';
import type { AD } from '@/shared/types/Utils';
import { createContext } from 'react';

export const DispatchContext = createContext<AD<ActionDispatchList>>(
    function () {}
);
