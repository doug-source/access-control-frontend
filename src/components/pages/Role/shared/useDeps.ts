import { roleReducer } from '@/shared/reducers/roleReducer';
import { roleInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    return useReducer(roleReducer, roleInitialData);
};
