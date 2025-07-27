import { useAuth } from '@/shared/hooks/useAuth';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { usePageRequesterWithRestore } from '@/shared/hooks/usePageRequesterWithRestore';
import { type UserIndex } from '@/shared/types/Models/User';
import { type RestorationSuccessAction } from '@/shared/types/Reducers/Custom/RestorationAction';
import { type ActionError } from '@/shared/types/Reducers/Standard/Action';
import { type RestorationResponse } from '@/shared/types/Response/Restoration';
import { type Paths } from '@/shared/types/Urls/Paths';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachRestorationErrors } from '@/shared/utils/detachErrors/detachRestorationErrors';
import { useCallback } from 'react';

export const useRestoreHandler = (
    data: UserIndex | null,
    endpoint: Paths['endpoint']['restorations']
) => {
    const requester = usePageRequesterWithRestore();
    const dispatch = useDispatch<
        ActionError | RestorationSuccessAction<UserIndex>
    >();
    const token = useAuth()?.user?.token;
    return useCallback(async () => {
        if (requester === null || !data || !token) {
            return;
        }
        const output = (await requester.restore(
            token,
            endpoint,
            data.id
        )) as RestorationResponse;
        switch (output.statusCode) {
            case 200: {
                dispatch({ type: 'restoration-success', payload: data });
                break;
            }
            case 422:
            case 401:
            case 403: {
                const payload = detachRestorationErrors(output);
                dispatch({
                    type: 'error',
                    payload,
                });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [endpoint, requester, data, token, dispatch]);
};
