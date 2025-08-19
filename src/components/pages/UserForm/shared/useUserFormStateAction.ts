import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { UserFormState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useUserFormStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, UserFormState>();

    return useCallback(
        async (prevState: UserFormState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
