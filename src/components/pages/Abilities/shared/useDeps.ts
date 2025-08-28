import { useAuth } from '@/shared/hooks/useAuth';
import { abilitiesReducer } from '@/shared/reducers/abilitiesReducer';
import { abilitiesInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const id = useAuth()?.user?.id;
    return useReducer(
        abilitiesReducer('ability', Number(id ?? 0)),
        abilitiesInitialData('ability', Number(id ?? 0))
    );
};
