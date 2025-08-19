import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { RegisterAccountState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useRegisterAccountStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, RegisterAccountState>();

    return useCallback(
        async (prevState: RegisterAccountState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
