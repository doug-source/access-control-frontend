import { useAuth } from '@/shared/hooks/useAuth';
import { useCreator } from '@/shared/hooks/useCreator';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import {
    type ActionError,
    type ActionRequesting,
} from '@/shared/types/Reducers/Standard/Action';
import { type RoleCreationResponse } from '@/shared/types/Response/RoleCreation';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachRoleCreationErrors } from '@/shared/utils/detachErrors/detachRoleCreationErrors';
import { useCallback, useRef, type FormEvent } from 'react';

export const useRoleFormSubmit = () => {
    const token = useAuth()?.user?.token;
    const nameRef = useRef<HTMLInputElement | null>(null);
    const creator = useCreator();
    const navigate = useLocalNavigate();
    const dispatch = useDispatch<ActionRequesting | ActionError>();

    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const { current: nameInput } = nameRef;
            if (!nameInput || !token) {
                return;
            }
            dispatch({ type: 'loading' });
            const output = (await creator.storeRole(
                '/api/roles',
                {
                    name: nameInput.value,
                },
                token
            )) as RoleCreationResponse;
            switch (output.statusCode) {
                case 201: {
                    navigate('/roles', { replace: true });
                    break;
                }
                case 422:
                case 401:
                case 403: {
                    const payload = detachRoleCreationErrors(output);
                    dispatch({ type: 'error', payload });
                    break;
                }
                default:
                    assertUnreachable(output);
            }
        },
        [nameRef, dispatch, token, creator, navigate]
    );

    return [nameRef, handler] as const;
};
