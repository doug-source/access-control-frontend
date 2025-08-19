import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { ResetPasswordState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useResetPasswordStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, ResetPasswordState>();

    return useCallback(
        async (prevState: ResetPasswordState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
