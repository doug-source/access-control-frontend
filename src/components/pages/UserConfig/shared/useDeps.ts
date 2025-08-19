import { useAuth } from '@/shared/hooks/useAuth';
import { userConfigInitialData } from '@/shared/utils/initialStates';
import { useActionState } from 'react';
import { useUserConfigStateAction } from './useUserConfigStateAction';

export const useDeps = () => {
    const user = useAuth()?.user;
    const photoRemote = user?.photo ?? null;
    const name = user?.name ?? '';
    const phone = user?.phone ?? '';
    const email = user?.email ?? '';

    const [submitHandler, clearFileRef] = useUserConfigStateAction();
    const actionStateList = useActionState(submitHandler, {
        ...userConfigInitialData,
        photoRemote,
        fields: {
            ...userConfigInitialData.fields,
            name,
            phone,
            email,
        },
    });
    return [...actionStateList, clearFileRef] as const;
};
