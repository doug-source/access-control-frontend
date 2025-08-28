import { useAuth } from '@/shared/hooks/useAuth';
import { rolesReducer } from '@/shared/reducers/rolesReducer';
import { rolesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const id = useAuth()?.user?.id;
    return useReducer(
        rolesReducer('role-from-user', Number(id ?? 0)),
        rolesInitialData('role-from-user', Number(id ?? 0))
    );
};
