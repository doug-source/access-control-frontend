import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { RequestAccountState } from '@/shared/types/States';
import { requestAccountInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useRegisterRequestProvided } from './useRegisterRequestProvided';

export const useDeps = () => {
    const submitHandler = useLogicBaseStateAction<RequestAccountState>();
    return useActionState(
        submitHandler,
        useRegisterRequestProvided(requestAccountInitialData)
    );
};
