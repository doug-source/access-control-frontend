import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { RoleFormState } from '@/shared/types/States';
import { roleFormInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';

export const useFormDeps = () => {
    const submitHandler = useLogicBaseStateAction<RoleFormState>();
    return useActionState(submitHandler, roleFormInitialData);
};
