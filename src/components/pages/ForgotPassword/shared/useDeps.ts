import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { ForgotPasswordState } from '@/shared/types/States';
import { forgotPasswordInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';

export const useDeps = () => {
    const submitHandler = useLogicBaseStateAction<ForgotPasswordState>();
    return useActionState(submitHandler, forgotPasswordInitialData);
};
