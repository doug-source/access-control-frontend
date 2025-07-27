import { registerRequestReducer } from '@/shared/reducers/registerRequestReducer';
import { registerRequestInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    return useReducer(registerRequestReducer, registerRequestInitialData);
};
