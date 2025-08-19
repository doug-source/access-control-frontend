import { forgotPasswordInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useForgotPasswordStateAction } from './useForgotPasswordStateAction';

export const useDeps = () => {
    const submitHandler = useForgotPasswordStateAction();
    return useActionState(submitHandler, forgotPasswordInitialData);
};
