import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import { abilitiesReducer } from '@/shared/reducers/abilitiesReducer';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const { page, group } = usePageGroupPagination('ability-from-role');
    return useReducer(abilitiesReducer, abilitiesInitialData(page, group));
};
