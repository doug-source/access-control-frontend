import { registerAccountReducer } from '@/shared/reducers/registerAccountReducer';
import { registerAccountInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    return useReducer(registerAccountReducer, registerAccountInitialData);
};
