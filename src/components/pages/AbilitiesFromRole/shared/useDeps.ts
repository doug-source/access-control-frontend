import { useSignState } from '@/shared/hooks/useSignState';
import { abilitiesReducer } from '@/shared/reducers/abilitiesReducer';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const id = useSignState().user?.id;
    return useReducer(
        abilitiesReducer('ability-from-role', Number(id ?? 0)),
        abilitiesInitialData('ability-from-role', Number(id ?? 0))
    );
};
