import { useAuth } from '@/shared/hooks/useAuth';
import { usersReducer } from '@/shared/reducers/usersReducer';
import { usersInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const id = useAuth()?.user?.id;
    const [state, dispatch] = useReducer(
        usersReducer('user-removed', Number(id ?? 0)),
        usersInitialData('user-removed', Number(id ?? 0))
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
    return { state, dispatch, inputRef };
};
