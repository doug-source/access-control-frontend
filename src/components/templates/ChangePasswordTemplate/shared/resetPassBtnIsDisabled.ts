import { type RequestStatus } from '@/shared/types/Http/Request';
import { type ResetPasswordState } from '@/shared/types/Reducers/Guest/ChangePassword';
import { btnIsDisabled } from '@/shared/utils/btnIsDisabled';

export const resetPassBtnIsDisabled = (
    state: ResetPasswordState,
    ...types: RequestStatus['statusCode'][]
) => {
    const byStatus = btnIsDisabled(state.requestStatus, ...types);
    return byStatus || state.email === null || state.token === null;
};
