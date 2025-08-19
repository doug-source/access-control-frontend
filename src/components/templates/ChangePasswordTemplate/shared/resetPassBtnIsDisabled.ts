import type { ResetPasswordState } from '@/shared/types/States';

export const resetPassBtnIsDisabled = (
    state: ResetPasswordState,
    pending: boolean
) => {
    return pending || state.email === null || state.token === null;
};
