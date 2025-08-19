import { registerAccountInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useRegisterAccountProvided } from './useRegisterAccountProvided';
import { useRegisterAccountStateAction } from './useRegisterAccountStateAction';

export const useDeps = () => {
    const submitHandler = useRegisterAccountStateAction();
    return useActionState(
        submitHandler,
        useRegisterAccountProvided(registerAccountInitialData)
    );
};
