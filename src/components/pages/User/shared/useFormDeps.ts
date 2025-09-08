import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import type { UserFormState } from '@/shared/types/States';
import { userFormInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';

export const useFormDeps = () => {
    const submitHandler = useLogicBaseStateAction<UserFormState>();
    return useActionState(submitHandler, userFormInitialData);
};
