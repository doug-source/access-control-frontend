import { useAuth } from '@/shared/hooks/useAuth';
import { useAuthenticator } from '@/shared/hooks/useAuthenticator';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { type Action } from '@/shared/types/Reducers/Standard/Action';
import { type AuthResponse } from '@/shared/types/Response/Auth';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachAuthError } from '@/shared/utils/detachErrors/detachAuthError';
import { type FormEvent, useCallback, useRef } from 'react';

export const useAuthSubmit = () => {
    const auth = useAuth();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const authenticator = useAuthenticator();
    const dispatch = useDispatch<Action>();

    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { current: emailInput } = emailRef;
            const { current: passwordInput } = passwordRef;
            if (!emailInput || !passwordInput) {
                return;
            }
            dispatch({ type: 'loading' });
            const output = (await authenticator.login({
                email: emailInput.value,
                password: passwordInput.value,
            })) as AuthResponse;
            switch (output.statusCode) {
                case 200: {
                    const {
                        body: { user },
                    } = output;
                    dispatch({
                        type: 'success',
                        payload: 'Logado com sucesso!',
                    });
                    setTimeout(() => {
                        auth?.login(user);
                    }, 1500);
                    break;
                }
                case 401:
                case 403:
                case 422: {
                    const payload = detachAuthError(output);
                    dispatch({
                        type: 'error',
                        payload,
                    });
                    break;
                }
                default:
                    assertUnreachable(output);
                    break;
            }
        },
        [emailRef, passwordRef, authenticator, dispatch, auth]
    );

    return { emailRef, passwordRef, handler };
};
