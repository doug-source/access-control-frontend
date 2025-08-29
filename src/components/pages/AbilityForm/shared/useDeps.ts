import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import { AbilityFormState } from '@/shared/types/States';
import { abilityFormInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';

export const useDeps = () => {
    const submitHandler = useLogicBaseStateAction<AbilityFormState>();
    return useActionState(submitHandler, abilityFormInitialData);
};
