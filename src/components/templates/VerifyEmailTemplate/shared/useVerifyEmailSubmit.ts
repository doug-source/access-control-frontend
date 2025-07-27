import { useAuth } from '@/shared/hooks/useAuth';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useVerifyEmailRequester } from '@/shared/hooks/useVerifyEmailRequester';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type Action } from '@/shared/types/Reducers/Standard/Action';
import { type FormEvent, useCallback } from 'react';

export const useVerifyEmailSubmit = () => {
    const auth = useAuth();
    const verifyEmail = useVerifyEmailRequester();
    const dispatch = useDispatch<Action>();

    return useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!auth || auth.user === null) {
                return;
            }
            dispatch({ type: 'loading' });
            const output = (await verifyEmail.resend(
                auth.user.token
            )) as HttpSuccessResponse;
            if (output.statusCode !== 200) {
                dispatch({
                    type: 'error',
                    payload: {
                        type: 'generic',
                        message: 'Erro na requisição!',
                    },
                });
            } else {
                dispatch({ type: 'success', payload: 'Email enviado!' });
            }
        },
        [auth, dispatch, verifyEmail]
    );
};
