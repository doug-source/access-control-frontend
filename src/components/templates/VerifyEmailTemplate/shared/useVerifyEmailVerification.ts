import { useAuth } from '@/shared/hooks/useAuth';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useVerifyEmailRequester } from '@/shared/hooks/useVerifyEmailRequester';
import { type ActionError } from '@/shared/types/Reducers/Standard/Action';
import { type VerifyEmailResponse } from '@/shared/types/Response/VerifyEmail';
import { type NullableEmailVerifyLoaderReturn } from '@/shared/types/ReturnLoaders';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachVerifyEmailError } from '@/shared/utils/detachErrors/detachVerifyEmailError';
import { useCallback, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { type EmailRedirectParams } from './types';

export const useVerifyEmailVerification = (
    emailRedirect: EmailRedirectParams
) => {
    const auth = useAuth();
    const dispatch = useDispatch<ActionError>();
    const [verified, setVerified] = useState(false);
    const navigate = useLocalNavigate();
    const finalize = useCallback(() => {
        setVerified(true);
    }, [setVerified]);
    const loaderData = useLoaderData() as NullableEmailVerifyLoaderReturn;
    const verifyEmailRequester = useVerifyEmailRequester();
    useEffect(() => {
        if (
            typeof emailRedirect.id === 'undefined' ||
            typeof emailRedirect.hash === 'undefined' ||
            auth === null ||
            auth.user === null ||
            auth.user.emailVerified === true ||
            loaderData === null ||
            verified === true
        ) {
            return;
        }
        const { id, hash } = emailRedirect;
        verifyEmailRequester
            .verify(auth.user.token, {
                id,
                hash,
                ...loaderData,
            })
            .then(async (arg) => {
                const output = arg as VerifyEmailResponse;
                switch (output.statusCode) {
                    case 200: {
                        auth.emailValidated();
                        finalize();
                        break;
                    }
                    case 401:
                    case 403:
                    case 422: {
                        const payload = detachVerifyEmailError(
                            output,
                            'Verificação de e-mail expirada!'
                        );
                        dispatch({
                            type: 'error',
                            payload,
                        });
                        navigate('/email/verify', { replace: true });
                        break;
                    }
                    default:
                        assertUnreachable(output);
                }
            });
    }, [
        emailRedirect,
        verified,
        finalize,
        verifyEmailRequester,
        auth,
        loaderData,
        dispatch,
        navigate,
    ]);
    return [verified] as const;
};
