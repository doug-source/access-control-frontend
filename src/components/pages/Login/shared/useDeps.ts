import { loginInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useLoginProvided } from './useLoginProvided';
import { useLoginStateAction } from './useLoginStateAction';

export const useDeps = () => {
    const submitHandler = useLoginStateAction();
    return useActionState(submitHandler, useLoginProvided(loginInitialData));
};
