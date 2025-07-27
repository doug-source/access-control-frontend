import { useAuth } from '@/shared/hooks/useAuth';
import { userConfigReducer } from '@/shared/reducers/userConfigReducer';
import { userConfigInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer } from 'react';

export const useDeps = () => {
    const photoRemote = useAuth()?.user?.photo ?? null;
    return useReducer(userConfigReducer, {
        ...userConfigInitialData,
        photoRemote,
    });
};
