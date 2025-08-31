import { useSignState } from '@/shared/hooks/useSignState';
import { rolesReducer } from '@/shared/reducers/rolesReducer';
import { rolesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const id = useSignState().user?.id;
    return useReducer(
        rolesReducer('role', Number(id ?? 0)),
        rolesInitialData('role', Number(id ?? 0))
    );
};
