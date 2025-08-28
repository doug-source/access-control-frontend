import { useAuth } from '@/shared/hooks/useAuth';
import { registerRequestsReducer } from '@/shared/reducers/registerRequestsReducer';
import { registerRequestsInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const id = useAuth()?.user?.id;
    const [state, dispatch] = useReducer(
        registerRequestsReducer('register-request', Number(id ?? 0)),
        registerRequestsInitialData('register-request', Number(id ?? 0))
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    return { state, dispatch, inputRef };
};
