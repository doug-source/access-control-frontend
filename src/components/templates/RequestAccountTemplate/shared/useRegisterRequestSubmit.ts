import { useDispatch } from '@/shared/hooks/useDispatch';
import { useRegisterRequestMaker } from '@/shared/hooks/useRegisterRequestMaker';
import { type Action } from '@/shared/types/Reducers/Standard/Action';
import { type RequestAccountResponse } from '@/shared/types/Response/Guest/RequestAccount';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachRegisterRequestError } from '@/shared/utils/detachErrors/detachRegisterRequestError';
import { type FormEvent, useCallback, useRef } from 'react';

export const useRegisterRequestSubmit = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const registerRequester = useRegisterRequestMaker();
    const dispatch = useDispatch<Action>();

    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { current: emailInput } = emailRef;
            const { current: phoneInput } = phoneRef;
            if (!emailInput || !phoneInput) {
                return;
            }
            dispatch({ type: 'loading' });
            const phone = phoneInput.value.trim();
            const output = (await registerRequester.provide(
                Object.assign(
                    {
                        email: emailInput.value,
                    },
                    phone && { phone }
                )
            )) as RequestAccountResponse;
            switch (output.statusCode) {
                case 201: {
                    dispatch({
                        type: 'success',
                        payload: 'Requisitado!',
                    });
                    break;
                }
                case 401:
                case 403:
                case 422: {
                    const payload = detachRegisterRequestError(output);
                    dispatch({ type: 'error', payload });
                    break;
                }
                default:
                    assertUnreachable(output);
                    break;
            }
        },
        [emailRef, phoneRef, registerRequester, dispatch]
    );

    return { emailRef, phoneRef, handler };
};
