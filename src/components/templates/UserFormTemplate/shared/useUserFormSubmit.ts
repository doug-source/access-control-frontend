import { useAuth } from '@/shared/hooks/useAuth';
import { useCreator } from '@/shared/hooks/useCreator';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import {
    type ActionError,
    type ActionRequesting,
} from '@/shared/types/Reducers/Standard/Action';
import { type FastUserCreationResponse } from '@/shared/types/Response/FastUserCreation';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachFastUserErrors } from '@/shared/utils/detachErrors/detachFastUserErrors';
import { useCallback, useRef, type FormEvent } from 'react';

export const useUserFormSubmit = () => {
    const token = useAuth()?.user?.token;
    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const creator = useCreator();
    const navigate = useLocalNavigate();
    const dispatch = useDispatch<ActionRequesting | ActionError>();

    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { current: nameInput } = nameRef;
            const { current: emailInput } = emailRef;
            const { current: passwordInput } = passwordRef;
            if (!nameInput || !emailInput || !passwordInput || !token) {
                return;
            }
            dispatch({ type: 'loading' });
            const output = (await creator.storeUser(
                '/api/users/fast/store',
                {
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value,
                    password_confirmation: passwordInput.value,
                },
                token
            )) as FastUserCreationResponse;
            switch (output.statusCode) {
                case 201: {
                    navigate('/users', { replace: true });
                    break;
                }
                case 422:
                case 401:
                case 403: {
                    const payload = detachFastUserErrors(output);
                    dispatch({ type: 'error', payload });
                    break;
                }
                default:
                    assertUnreachable(output);
            }
        },
        [nameRef, emailRef, passwordRef, dispatch, token, creator, navigate]
    );

    return { nameRef, emailRef, passwordRef, handler };
};
