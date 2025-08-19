import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { ForgotPasswordState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useForgotPasswordStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, ForgotPasswordState>();

    return useCallback(
        async (prevState: ForgotPasswordState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
