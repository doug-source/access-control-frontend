import { type ActionDispatchList } from '@/shared/types/Reducers/ActionsList';
import { createContext } from 'react';

export const DispatchContext = createContext<ActionDispatchList>(
    function () {}
);
