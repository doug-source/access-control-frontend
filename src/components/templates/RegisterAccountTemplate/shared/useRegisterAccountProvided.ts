import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import {
    type ActionError,
    type ActionSuccess,
} from '@/shared/types/Reducers/Standard/Action';
import { type RegisterAccountLoaderReturn } from '@/shared/types/ReturnLoaders';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachRegisterAccountError } from '@/shared/utils/detachErrors/detachRegisterAccountError';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

export const useRegisterAccountProvided = () => {
    const navigate = useLocalNavigate();
    const output = useLoaderData() as RegisterAccountLoaderReturn;
    const dispatch = useDispatch<ActionError | ActionSuccess>();
    useEffect(() => {
        if (typeof output === 'undefined' || output === null) {
            navigate('/');
            return;
        }
        switch (output.statusCode) {
            case 201: {
                const token = output.body as string;
                dispatch({ type: 'success', payload: token });
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
    }, [dispatch, navigate, output]);
};
