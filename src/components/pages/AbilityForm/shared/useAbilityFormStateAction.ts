import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { AbilityFormState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useAbilityFormStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, AbilityFormState>();

    return useCallback(
        async (prevState: AbilityFormState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
