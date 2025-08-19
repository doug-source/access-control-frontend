import { roleFormInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useRoleFormStateAction } from './useRoleFormStateAction';

export const useDeps = () => {
    const submitHandler = useRoleFormStateAction();
    return useActionState(submitHandler, roleFormInitialData);
};
