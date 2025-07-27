import { useAuth } from '@/shared/hooks/useAuth';
import { usePageRequester } from '@/shared/hooks/usePageRequester';
import {
    RemotionActionModels,
    type RemotionSuccessAction,
} from '@/shared/types/Reducers/Custom/RemotionAction';
import { type ActionError } from '@/shared/types/Reducers/Standard/Action';
import { type RemotionResponse } from '@/shared/types/Response/Remotion';
import { type Paths } from '@/shared/types/Urls/Paths';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachRemotionErrors } from '@/shared/utils/detachErrors/detachRemotionErrors';
import { useCallback } from 'react';
import { useDispatch } from './useDispatch';

export const useRemoveHandler = <T extends { id: number }>(
    data: T | null,
    endpoint: Paths['endpoint']['remotionPrefixes']
) => {
    const auth = useAuth();
    const pageRequester = usePageRequester();
    const token = auth?.user?.token;
    const dispatch = useDispatch<
        ActionError | RemotionSuccessAction<RemotionActionModels>
    >();
    return useCallback(async () => {
        if (typeof token === 'undefined' || data === null) {
            return;
        }
        const output = (await pageRequester.remove(
            token,
            `${endpoint}/${data.id}`
        )) as RemotionResponse;
        switch (output.statusCode) {
            case 200: {
                dispatch({ type: 'remotion-success', payload: data });
                break;
            }
            case 422:
            case 401:
            case 403: {
                const payload = detachRemotionErrors(output);
                dispatch({
                    type: 'error',
                    payload,
                });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [token, data, pageRequester, dispatch, endpoint]);
};
