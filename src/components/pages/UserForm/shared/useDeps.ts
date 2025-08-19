import { userFormInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useUserFormStateAction } from './useUserFormStateAction';

export const useDeps = () => {
    const submitHandler = useUserFormStateAction();
    return useActionState(submitHandler, userFormInitialData);
};
