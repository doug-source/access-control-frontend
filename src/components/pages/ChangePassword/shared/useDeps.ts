import { resetPasswordInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useResetPasswordProvided } from './useResetPasswordProvided';
import { useResetPasswordStateAction } from './useResetPasswordStateAction';

export const useDeps = () => {
    const submitHandler = useResetPasswordStateAction();
    return useActionState(
        submitHandler,
        useResetPasswordProvided(resetPasswordInitialData)
    );
};
