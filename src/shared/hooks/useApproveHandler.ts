import { useAuth } from '@/shared/hooks/useAuth';
import { usePageRequesterWithApprove } from '@/shared/hooks/usePageRequesterWithApprove';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type ApprovementSuccessAction } from '@/shared/types/Reducers/Custom/ApprovementAction';
import { type ActionError } from '@/shared/types/Reducers/Standard/Action';
import { type ApprovementResponse } from '@/shared/types/Response/Approvement';
import { type Paths } from '@/shared/types/Urls/Paths';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachApprovementErrors } from '@/shared/utils/detachErrors/detachApprovementErrors';
import { useCallback } from 'react';
import { useDispatch } from './useDispatch';

export const useApproveHandler = (
    data: RegisterRequestIndex | null,
    endpoint: Paths['endpoint']['approvements']
) => {
    const requester = usePageRequesterWithApprove();
    const dispatch = useDispatch<
        ActionError | ApprovementSuccessAction<RegisterRequestIndex>
    >();
    const token = useAuth()?.user?.token;
    return useCallback(async () => {
        if (requester === null || !data || !token) {
            return;
        }
        const output = (await requester.approve(
            token,
            endpoint
        )) as ApprovementResponse;
        switch (output.statusCode) {
            case 200: {
                dispatch({ type: 'approvement-success', payload: data });
                break;
            }
            case 422:
            case 401:
            case 403: {
                const payload = detachApprovementErrors(output);
                dispatch({
                    type: 'error',
                    payload,
                });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [data, dispatch, endpoint, requester, token]);
};
