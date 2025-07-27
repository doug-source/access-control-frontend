import { type State } from '@/shared/types/Reducers/Standard/State';
import { intoRequestStatus } from '@/shared/utils/intoRequestStatus';
import { type EmailRedirectParams } from './types';

/**
 * This helper function allows the view show the screen in following flows:
 * -   with activation request button enabled (before the request)
 * -   with activation request button disabled (during the request)
 * -   no activation request button (after the request)
 */
export const isVerifyEmailRequesting = (
    requestStatus: State['requestStatus'],
    emailRedirect: EmailRedirectParams
) => {
    return (
        Boolean(emailRedirect?.id) &&
        Boolean(emailRedirect?.hash) &&
        !intoRequestStatus(requestStatus, 401, 403, 422)
    );
};
