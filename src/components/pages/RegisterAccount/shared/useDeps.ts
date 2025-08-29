import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { RegisterAccountState } from '@/shared/types/States';
import { registerAccountInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useRegisterAccountProvided } from './useRegisterAccountProvided';

export const useDeps = () => {
    const submitHandler = useLogicBaseStateAction<RegisterAccountState>();
    return useActionState(
        submitHandler,
        useRegisterAccountProvided(registerAccountInitialData)
    );
};
