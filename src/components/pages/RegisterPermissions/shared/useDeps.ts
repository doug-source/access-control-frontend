import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import { registerPermissionsReducer } from '@/shared/reducers/registerPermissionsReducer';
import { registerPermissionsInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const { page, group } = usePageGroupPagination('register-permissions');
    const [state, dispatch] = useReducer(
        registerPermissionsReducer,
        registerPermissionsInitialData(page, group)
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
    return { state, dispatch, inputRef };
};
