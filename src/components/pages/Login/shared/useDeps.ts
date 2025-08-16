import { standardInitialData } from '@/shared/utils/ReduceInitialValues';
import { useActionState } from 'react';
import { useAuthStateAction } from './useAuthStateAction';
import { useLoginProvided } from './useLoginProvided';

export const useDeps = () => {
    const submitHandler = useAuthStateAction();
    const [state, ...remain] = useActionState(
        submitHandler,
        standardInitialData
    );
    const formState = useLoginProvided(state);
    return [formState, ...remain] as const;
};
