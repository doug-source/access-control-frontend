import { useDispatch } from '@/shared/hooks/useDispatch';
import { useForgotPasswordHandler } from '@/shared/hooks/useForgotPasswordHandler';
import { type Action } from '@/shared/types/Reducers/Standard/Action';
import { type ForgotPasswordResponse } from '@/shared/types/Response/Guest/ForgotPassword';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachForgotPasswordError } from '@/shared/utils/detachErrors/detachForgotPasswordError';
import { useCallback, useRef, type FormEvent } from 'react';

export const useForgotPasswordSubmit = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const forgotPasswordHandler = useForgotPasswordHandler();
    const dispatch = useDispatch<Action>();

    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { current: emailInput } = emailRef;
            if (!emailInput) {
                return;
            }
            dispatch({ type: 'loading' });
            const output = (await forgotPasswordHandler.sayYouForgot({
                email: emailInput.value,
            })) as ForgotPasswordResponse;
            switch (output.statusCode) {
                case 200: {
                    dispatch({
                        type: 'success',
                        payload: 'Solicitado!',
                    });
                    break;
                }
                case 422:
                case 401:
                case 403: {
                    const payload = detachForgotPasswordError(output);
                    dispatch({ type: 'error', payload });
                    break;
                }
                default:
                    assertUnreachable(output);
            }
        },
        [dispatch, forgotPasswordHandler]
    );
    return [emailRef, handler] as const;
};
