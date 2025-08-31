import { useLogicBase } from '@/shared/hooks/useLogicBase';
import { useSignDispatch } from '@/shared/hooks/useSignDispatch';
import type { Reference } from '@/shared/types/Responsabilities/LogicBase';
import type { VerifyEmailState } from '@/shared/types/States';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { useVerifyEmailRequest } from './useVerifyEmailRequest';

export const useVerifyEmailOutput = (
    state: VerifyEmailState,
    dispatchRef: RefObject<Dispatch<SetStateAction<VerifyEmailState>> | null>
): VerifyEmailState => {
    const signDispatch = useSignDispatch();
    const { errorHandler } = useLogicBase<
        Reference['Handlers']['VerifyEmail']['Error'],
        VerifyEmailState
    >();
    const [newState, output, setState] = useVerifyEmailRequest(state);
    dispatchRef.current = setState;

    if (state.resend === true) {
        return state;
    }
    if (output === null) {
        return newState;
    }

    switch (output.statusCode) {
        case 200: {
            signDispatch({ type: 'EMAIL_VALIDATED' });
            return {
                ...newState,
                verified: true,
            };
        }
        case 401:
        case 403:
        case 422: {
            return errorHandler.handle(output, newState);
        }
        default:
            assertUnreachable(output);
    }
};
