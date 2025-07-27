import { useAuth } from '@/shared/hooks/useAuth';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { usePhotoFile } from '@/shared/hooks/usePhotoFile';
import { useSelfUpdate } from '@/shared/hooks/useSelfUpdate';
import type {
    ActionError,
    ActionRequesting,
} from '@/shared/types/Reducers/Standard/Action';
import type { UserConfigResponse } from '@/shared/types/Response/UserConfig';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';
import { detachUserConfigErrors } from '@/shared/utils/detachErrors/detachUserConfigErrors';
import { type FormEvent, useCallback, useRef } from 'react';

export const useSubmitHandle = () => {
    const nameRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const photoRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useDispatch<ActionRequesting | ActionError>();
    const navigate = useLocalNavigate();
    const file = usePhotoFile();
    const updater = useSelfUpdate();
    const auth = useAuth();
    const updateAuthUser = auth?.updateAuthUser;
    const token = auth?.user?.token;
    const handler = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const { current: nameInput } = nameRef;
            const { current: phoneInput } = phoneRef;
            if (
                !token ||
                !updater ||
                !nameInput ||
                !phoneInput ||
                !updateAuthUser
            ) {
                return;
            }
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            dispatch({ type: 'loading' });
            const output = (await updater.update(
                token,
                {
                    name,
                    ...(phone ? { phone } : null),
                },
                file
            )) as UserConfigResponse;
            switch (output.statusCode) {
                case 200: {
                    updateAuthUser(name, phone ?? null, output.body.photo);
                    navigate('/config', { replace: true });
                    break;
                }
                case 422:
                case 401:
                case 403: {
                    const payload = detachUserConfigErrors(output);
                    dispatch({ type: 'error', payload });
                    break;
                }
                default:
                    assertUnreachable(output);
                    break;
            }
        },
        [
            nameRef,
            phoneRef,
            token,
            updateAuthUser,
            updater,
            file,
            navigate,
            dispatch,
        ]
    );
    return { photoRef, phoneRef, nameRef, emailRef, handler };
};
