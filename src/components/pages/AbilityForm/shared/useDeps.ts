import { abilityFormInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useAbilityFormStateAction } from './useAbilityFormStateAction';

export const useDeps = () => {
    const submitHandler = useAbilityFormStateAction();
    return useActionState(submitHandler, abilityFormInitialData);
};
