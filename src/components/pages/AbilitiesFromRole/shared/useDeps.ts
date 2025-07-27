import { abilitiesReducer } from '@/shared/reducers/abilitiesReducer';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    return useReducer(abilitiesReducer, abilitiesInitialData);
};
