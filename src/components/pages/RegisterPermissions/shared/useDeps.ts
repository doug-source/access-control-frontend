import { useSignState } from '@/shared/hooks/useSignState';
import { registerPermissionsReducer } from '@/shared/reducers/registerPermissionsReducer';
import { registerPermissionsInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const id = useSignState().user?.id;
    const [state, dispatch] = useReducer(
        registerPermissionsReducer('register-permissions', Number(id ?? 0)),
        registerPermissionsInitialData('register-permissions', Number(id ?? 0))
    );
    const inputRef = useRef<HTMLInputElement | null>(null);
    return { state, dispatch, inputRef };
};
