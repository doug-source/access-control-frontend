import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { RequestAccountState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useRequestAccountStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, RequestAccountState>();

    return useCallback(
        async (prevState: RequestAccountState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
