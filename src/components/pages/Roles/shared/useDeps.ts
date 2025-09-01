import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import { rolesReducer } from '@/shared/reducers/rolesReducer';
import { rolesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const { page, group } = usePageGroupPagination('role');
    return useReducer(rolesReducer, rolesInitialData(page, group));
};
