import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { LoginState } from '@/shared/types/States';
import { loginInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useLoginProvided } from './useLoginProvided';

export const useDeps = () => {
    const submitHandler = useLogicBaseStateAction<LoginState>();
    return useActionState(submitHandler, useLoginProvided(loginInitialData));
};
