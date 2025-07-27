import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import { userReducer } from '@/shared/reducers/userReducer';
import { userInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const { pathname } = useLocalLocation();
    const remotionCtx = pathname.startsWith('/users/removed');

    const [state, dispatch] = useReducer(userReducer, userInitialData);
    return { state, dispatch, remotionCtx };
};
