import { registerPermissionsReducer } from '@/shared/reducers/registerPermissionsReducer';
import { registerPermissionsInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const [state, dispatch] = useReducer(
        registerPermissionsReducer,
        registerPermissionsInitialData
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
    return { state, dispatch, inputRef };
};
