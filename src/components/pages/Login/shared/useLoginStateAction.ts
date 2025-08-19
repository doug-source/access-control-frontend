import { useLogicBase } from '@/shared/hooks/useLogicBase';
import { LoginState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useLoginStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, LoginState>();

    return useCallback(
        async (prevState: LoginState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
