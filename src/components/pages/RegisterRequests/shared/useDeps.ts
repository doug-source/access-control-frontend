import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import { registerRequestsReducer } from '@/shared/reducers/registerRequestsReducer';
import { registerRequestsInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const { page, group } = usePageGroupPagination('register-request');
    const [state, dispatch] = useReducer(
        registerRequestsReducer,
        registerRequestsInitialData(page, group)
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    return { state, dispatch, inputRef };
};
