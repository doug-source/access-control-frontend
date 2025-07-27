import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useResetPasswordHandler } from '@/shared/hooks/useResetPasswordHandler';
import { type ResetPasswordAction } from '@/shared/types/Reducers/Guest/ChangePassword';
import { type ResetPasswordResponse } from '@/shared/types/Response/Guest/ResetPassword';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachResetPasswordError } from '@/shared/utils/detachErrors/detachResetPasswordError';
import { FormEvent, useCallback, useRef } from 'react';

export const useResetPasswordSubmit = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passConfirmRef = useRef<HTMLInputElement | null>(null);
    const tokenRef = useRef<HTMLInputElement | null>(null);
    const resetPasswordHandler = useResetPasswordHandler();
    const navigate = useLocalNavigate();
    const dispatch = useDispatch<ResetPasswordAction>();

    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { current: emailInput } = emailRef;
            const { current: passwordInput } = passwordRef;
            const { current: passConfirmInput } = passConfirmRef;
            const { current: tokenInput } = tokenRef;

            if (
                !emailInput ||
                !passwordInput ||
                !passConfirmInput ||
                !tokenInput
            ) {
                return;
            }
            dispatch({ type: 'loading' });
            const output = (await resetPasswordHandler.reset({
                email: emailInput.value,
                password: passwordInput.value,
                password_confirmation: passConfirmInput.value,
                token: tokenInput.value,
            })) as ResetPasswordResponse;
            switch (output.statusCode) {
                case 200: {
                    navigate('/');
                    break;
                }
                case 422:
                case 401:
                case 403: {
                    const payload = detachResetPasswordError(output);
                    dispatch({ type: 'error', payload });
                    break;
                }
                default:
                    assertUnreachable(output);
            }
        },
        [dispatch, resetPasswordHandler, navigate]
    );
    return { emailRef, passwordRef, passConfirmRef, tokenRef, handler };
};
