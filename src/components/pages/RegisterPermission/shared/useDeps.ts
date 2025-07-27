import { registerPermissionReducer } from '@/shared/reducers/registerPermissionReducer';
import { registerPermissionInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    return useReducer(registerPermissionReducer, registerPermissionInitialData);
};
