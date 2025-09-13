import type { PhotoFile } from '@/components/molecules/PhotoFile';
import { useLogicBaseStateAction } from '@/shared/hooks/useLogicBaseStateAction';
import { useSignState } from '@/shared/hooks/useSignState';
import type { UserConfigState } from '@/shared/types/States';
import { userConfigInitialData } from '@/shared/utils/initialStates';
import { ComponentRef, useActionState, useRef } from 'react';
import { useUserConfigCallback } from './useUserConfigCallback';

export const useDeps = () => {
    const user = useSignState().state.user;

    const name = user?.name ?? '';
    const phone = user?.phone ?? '';
    const email = user?.email ?? '';

    const clearFileRef = useRef<ComponentRef<typeof PhotoFile> | null>(null);
    const userConfigCallback = useUserConfigCallback(clearFileRef);
    const submitHandler =
        useLogicBaseStateAction<UserConfigState>(userConfigCallback);

    const [state, formAction, pending] = useActionState(submitHandler, {
        ...userConfigInitialData,
        fields: {
            ...userConfigInitialData.fields,
            name,
            phone,
            email,
        },
    });
    return { state, formAction, pending, clearFileRef };
};
