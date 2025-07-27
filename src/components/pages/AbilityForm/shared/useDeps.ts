import { standardReducer } from '@/shared/reducers/standardReducer';
import { standardInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const [state, dispatch] = useReducer(standardReducer, standardInitialData);
    return { state, dispatch };
};
