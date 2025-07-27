import { registerRequestsReducer } from '@/shared/reducers/registerRequestsReducer';
import { registerRequestsInitialData } from '@/shared/utils/ReduceInitialValues';
import { useReducer, useRef } from 'react';

export const useDeps = () => {
    const [state, dispatch] = useReducer(
        registerRequestsReducer,
        registerRequestsInitialData
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    return { state, dispatch, inputRef };
};
