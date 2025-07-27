import { useDispatch } from '@/shared/hooks/useDispatch';
import { type ResetPasswordAction } from '@/shared/types/Reducers/Guest/ChangePassword';
import { type ResetPasswordLoaderReturn } from '@/shared/types/ReturnLoaders';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachResetPasswordError } from '@/shared/utils/detachErrors/detachResetPasswordError';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router';

export const useResetPasswordProvided = () => {
    const output = useLoaderData() as ResetPasswordLoaderReturn;
    const dispatch = useDispatch<ResetPasswordAction>();
    useEffect(() => {
        if (typeof output === 'undefined' || output === null) {
            return;
        }
        switch (output.statusCode) {
            case 200: {
                const { token, email } = output.body;
                dispatch({ type: 'success', payload: { email, token } });
                break;
            }
            case 401:
            case 403:
            case 422: {
                const payload = detachResetPasswordError(output);
                dispatch({ type: 'error', payload });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [dispatch, output]);
};
