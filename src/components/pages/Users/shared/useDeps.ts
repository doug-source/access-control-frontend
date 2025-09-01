import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import { usersReducer } from '@/shared/reducers/usersReducer';
import { usersInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const { page, group } = usePageGroupPagination('user');
    const [state, dispatch] = useReducer(
        usersReducer,
        usersInitialData(page, group)
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    return { state, dispatch, inputRef };
};
