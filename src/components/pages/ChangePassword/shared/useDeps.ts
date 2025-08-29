import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { ResetPasswordState } from '@/shared/types/States';
import { resetPasswordInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useResetPasswordProvided } from './useResetPasswordProvided';

export const useDeps = () => {
    const submitHandler = useLogicBaseStateAction<ResetPasswordState>();
    return useActionState(
        submitHandler,
        useResetPasswordProvided(resetPasswordInitialData)
    );
};
