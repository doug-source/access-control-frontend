import { useAuth } from '@/shared/hooks/useAuth';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { type ActionError } from '@/shared/types/Reducers/Standard/Action';
import { type ProvidedLoaderReturn } from '@/shared/types/ReturnLoaders';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachAuthError } from '@/shared/utils/detachErrors/detachAuthError';
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';

export const useLoginProvided = () => {
    const [provided, setProvided] = useState(false);
    const navigate = useLocalNavigate();
    const auth = useAuth();
    const output = useLoaderData() as ProvidedLoaderReturn;
    const dispatch = useDispatch<ActionError>();
    useEffect(() => {
        if (!output) {
            return;
        }
        switch (output.statusCode) {
            case 200: {
                const {
                    body: { user },
                } = output;
                setProvided(true);
                auth?.login(user);
                break;
            }
            case 401:
            case 403:
            case 422: {
                const payload = detachAuthError(output);
                setProvided(false);
                navigate('/');
                dispatch({
                    type: 'error',
                    payload,
                });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [output, auth, navigate, dispatch]);
    return [provided] as const;
};
