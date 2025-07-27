import { useAuth } from '@/shared/hooks/useAuth';
import { useCreator } from '@/shared/hooks/useCreator';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import {
    type ActionError,
    type ActionRequesting,
} from '@/shared/types/Reducers/Standard/Action';
import { type AbilityCreationResponse } from '@/shared/types/Response/AbilityCreation';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachAbilityCreationErrors } from '@/shared/utils/detachErrors/detachAbilityCreationErrors';
import { FormEvent, useCallback, useRef } from 'react';

export const useAbilityFormSubmit = () => {
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
            const output = (await creator.storeAbility(
                '/api/abilities',
                {
                    name: nameInput.value,
                },
                token
            )) as AbilityCreationResponse;
            switch (output.statusCode) {
                case 201: {
                    navigate('/abilities', { replace: true });
                    break;
                }
                case 422:
                case 401:
                case 403: {
                    const payload = detachAbilityCreationErrors(output);
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
