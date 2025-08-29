import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { LoginState } from '@/shared/types/States';
import { loginInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useLoginCallback } from './useLoginCallback';
import { useLoginProvided } from './useLoginProvided';

export const useDeps = () => {
    const loginCallback = useLoginCallback();
    const submitHandler = useLogicBaseStateAction<LoginState>(loginCallback);
    return useActionState(submitHandler, useLoginProvided(loginInitialData));
};
