import { useAuth } from '@/shared/hooks/useAuth';
import { verifyEmailInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useVerifyEmailOutput } from './useVerifyEmailOutput';
import { useVerifyEmailStateAction } from './useVerifyEmailStateAction';

export const useDeps = () => {
    const auth = useAuth();
    const initialState = {
        ...verifyEmailInitialData,
        verified: auth?.user?.emailVerified ?? false,
    };
    const [submitHandler, dispatchRef] = useVerifyEmailStateAction();
    const [state, ...remain] = useActionState(submitHandler, initialState);
    const stateUpdated = useVerifyEmailOutput(state, dispatchRef);

    return [stateUpdated, ...remain] as const;
};
