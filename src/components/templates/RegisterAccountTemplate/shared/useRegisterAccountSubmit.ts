import { useCreator } from '@/shared/hooks/useCreator';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { type Action } from '@/shared/types/Reducers/Standard/Action';
import { type RegisterAccountResponse } from '@/shared/types/Response/Guest/RegisterAccount';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachRegisterAccountError } from '@/shared/utils/detachErrors/detachRegisterAccountError';
import { type FormEvent, useCallback, useRef } from 'react';

export const useRegisterAccountSubmit = (token: string | null) => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passConfirmationRef = useRef<HTMLInputElement | null>(null);
    const registerAccountMaker = useCreator();
    const navigate = useLocalNavigate();
    const dispatch = useDispatch<Action>();

    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { current: nameInput } = nameRef;
            const { current: emailInput } = emailRef;
            const { current: passwordInput } = passwordRef;
            const { current: passConfirmationInput } = passConfirmationRef;
            if (
                !nameInput ||
                !emailInput ||
                !passwordInput ||
                !passConfirmationInput ||
                !token ||
                !token.trim()
            ) {
                return;
            }
            dispatch({ type: 'loading' });
            const output = (await registerAccountMaker.storeUser(
                '/api/users/store',
                {
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                    password_confirmation: passConfirmationInput.value,
                },
                token
            )) as RegisterAccountResponse;
            switch (output.statusCode) {
                case 201: {
                    dispatch({
                        type: 'success',
                        payload: 'Registrado!',
                    });
                    navigate('/');
                    break;
                }
                case 401:
                case 403:
                case 422: {
                    const payload = detachRegisterAccountError(output);
                    dispatch({ type: 'error', payload });
                    break;
                }
                default:
                    assertUnreachable(output);
            }
        },
        [dispatch, navigate, registerAccountMaker, token]
    );
    return { nameRef, emailRef, passwordRef, passConfirmationRef, handler };
};
