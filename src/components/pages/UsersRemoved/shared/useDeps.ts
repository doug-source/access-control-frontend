import { usersReducer } from '@/shared/reducers/usersReducer';
import { usersInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const [state, dispatch] = useReducer(usersReducer, usersInitialData);
    const inputRef = useRef<HTMLInputElement | null>(null);
    return { state, dispatch, inputRef };
};
