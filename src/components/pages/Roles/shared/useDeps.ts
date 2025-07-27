import { rolesReducer } from '@/shared/reducers/rolesReducer';
import { rolesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    return useReducer(rolesReducer, rolesInitialData);
};
