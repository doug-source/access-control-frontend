import { useSignState } from '@/shared/hooks/useSignState';
import { usersReducer } from '@/shared/reducers/usersReducer';
import { usersInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const id = useSignState().user?.id;
    const [state, dispatch] = useReducer(
        usersReducer('user', Number(id ?? 0)),
        usersInitialData('user', Number(id ?? 0))
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    return { state, dispatch, inputRef };
};
