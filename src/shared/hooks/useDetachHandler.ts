import { useDispatch } from '@/shared/hooks/useDispatch';
import { usePermissionsRequester } from '@/shared/hooks/usePermissionsRequester';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import type { RoleIndex } from '@/shared/types/Models/Role';
import type { DetachmentSuccessAction } from '@/shared/types/Reducers/Custom/DetachmentAction';
import type { ActionError } from '@/shared/types/Reducers/Standard/Action';
import type { PermissionRemovedResponse } from '@/shared/types/Response/PermissionRemoved';
import type { Paths } from '@/shared/types/Urls/Paths';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachPermissionRemovedErrors } from '@/shared/utils/detachErrors/detachPermissionRemovedErrors';
import { useCallback } from 'react';
import { useSignState } from './useSignState';

export const useDetachHandler = <T extends RoleIndex | AbilityIndex>(
    data: T | null,
    endpoint: Paths['endpoint']['detachments'],
    ...names: string[]
) => {
    const permissionsRequester = usePermissionsRequester();
    const token = useSignState().user?.token;
    const dispatch = useDispatch<ActionError | DetachmentSuccessAction<T>>();
    return useCallback(async () => {
        if (!permissionsRequester || !token || !data?.id) {
            return;
        }
        const output = (await permissionsRequester.detach(
            token,
            endpoint,
            names
        )) as PermissionRemovedResponse;
        switch (output.statusCode) {
            case 204: {
                dispatch({
                    type: 'detachment-success',
                    payload: data,
                });
                break;
            }
            case 422:
            case 401:
            case 403: {
                const payload = detachPermissionRemovedErrors(output);
                dispatch({ type: 'error', payload });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [permissionsRequester, token, data, endpoint, names, dispatch]);
};
