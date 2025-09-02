import { useSignState } from '@/shared/hooks/useSignState';
import { verifyEmailInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useVerifyEmailOutput } from './useVerifyEmailOutput';
import { useVerifyEmailStateAction } from './useVerifyEmailStateAction';

export const useDeps = () => {
    const emailVerified = useSignState().state.user?.emailVerified;
    const initialState = {
        ...verifyEmailInitialData,
        verified: emailVerified ?? false,
    };
    const [submitHandler, dispatchRef] = useVerifyEmailStateAction();
    const [state, ...remain] = useActionState(submitHandler, initialState);
    const stateUpdated = useVerifyEmailOutput(state, dispatchRef);

    return [stateUpdated, ...remain] as const;
};
