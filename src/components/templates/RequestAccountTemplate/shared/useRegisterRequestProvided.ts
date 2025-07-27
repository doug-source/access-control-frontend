import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import {
    type ActionError,
    type ActionSuccess,
} from '@/shared/types/Reducers/Standard/Action';
import { type RequestAccountLoaderReturn } from '@/shared/types/ReturnLoaders';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachRegisterRequestError } from '@/shared/utils/detachErrors/detachRegisterRequestError';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

export const useRegisterRequestProvided = () => {
    const navigate = useLocalNavigate();
    const output = useLoaderData() as RequestAccountLoaderReturn;
    const dispatch = useDispatch<ActionError | ActionSuccess>();
    useEffect(() => {
        if (typeof output === 'undefined' || output === null) {
            return;
        }
        switch (output.statusCode) {
            case 201: {
                navigate('/request');
                dispatch({ type: 'success', payload: 'Registrado!' });
                break;
            }
            case 401:
            case 403:
            case 422: {
                const payload = detachRegisterRequestError(output);
                navigate('/request');
                dispatch({ type: 'error', payload });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [dispatch, navigate, output]);
};
