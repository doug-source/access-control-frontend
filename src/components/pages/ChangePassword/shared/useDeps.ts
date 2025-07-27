import { resetPasswordReducer } from '@/shared/reducers/resetPasswordReducer';
import { resetPasswordInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    return useReducer(resetPasswordReducer, resetPasswordInitialData);
};
