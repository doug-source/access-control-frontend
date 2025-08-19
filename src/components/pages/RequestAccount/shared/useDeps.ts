import { requestAccountInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useRegisterRequestProvided } from './useRegisterRequestProvided';
import { useRequestAccountStateAction } from './useRequestAccountStateAction';

export const useDeps = () => {
    const submitHandler = useRequestAccountStateAction();
    return useActionState(
        submitHandler,
        useRegisterRequestProvided(requestAccountInitialData)
    );
};
