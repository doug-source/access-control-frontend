import { useLogicBase } from '@/shared/hooks/useLogicBase';
import type { RoleFormState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useRoleFormStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, RoleFormState>();

    return useCallback(
        async (prevState: RoleFormState, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
