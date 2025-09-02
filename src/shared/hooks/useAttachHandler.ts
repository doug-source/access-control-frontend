import { useDispatch } from '@/shared/hooks/useDispatch';
import { usePermissionsRequester } from '@/shared/hooks/usePermissionsRequester';
import { useSignState } from '@/shared/hooks/useSignState';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import type { RoleIndex } from '@/shared/types/Models/Role';
import type { AttachmentSuccessAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import type { ActionError } from '@/shared/types/Reducers/Standard/Action';
import type { PermissionIncludedResponse } from '@/shared/types/Response/PermissionIncluded';
import type { Paths } from '@/shared/types/Urls/Paths';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachPermissionIncludedErrors } from '@/shared/utils/detachErrors/detachPermissionIncludedErrors';
import { useCallback } from 'react';

export const useAttachHandler = <T extends RoleIndex | AbilityIndex>(
    data: T | null,
    endpoint: Paths['endpoint']['attachments'],
    ...names: string[]
) => {
    const permissionsRequester = usePermissionsRequester();
    const dispatch = useDispatch<ActionError | AttachmentSuccessAction<T>>();
    const token = useSignState().state.user?.token;
    return useCallback(async () => {
        if (!permissionsRequester || !token || !data?.id) {
            return;
        }
        const output = (await permissionsRequester.attach(
            token,
            endpoint,
            names
        )) as PermissionIncludedResponse;
        switch (output.statusCode) {
            case 204: {
                dispatch({
                    type: 'attachment-success',
                    payload: data,
                });
                break;
            }
            case 422:
            case 401:
            case 403: {
                const payload = detachPermissionIncludedErrors(output);
                dispatch({ type: 'error', payload });
                break;
            }
            default:
                assertUnreachable(output);
        }
    }, [permissionsRequester, token, data, endpoint, names, dispatch]);
};
