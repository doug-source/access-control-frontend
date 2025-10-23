import type { PhotoFile } from '@/components/molecules/PhotoFile';
import { useSignState } from '@/shared/hooks/useSignState';
import type { UserConfigState } from '@/shared/types/States';
import { type ComponentRef, useCallback } from 'react';

export const useUserConfigCallback = (
    clearFileRef: React.RefObject<ComponentRef<typeof PhotoFile> | null>
) => {
    const { state, dispatch } = useSignState();
    const photoStored = state.user?.photo;
    return useCallback(
        async (output: Promise<UserConfigState>) => {
            const result = await output;
            if (result.requestStatus.statusCode === 200) {
                dispatch({
                    type: 'CONFIG_USER_UPDATING',
                    payload: {
                        name: result.fields.name,
                        phone: result.fields.phone ?? null,
                        photo: result.fields.photo ?? photoStored ?? null,
                    },
                });
                clearFileRef.current?.clear();
            }
            return result;
        },
        [clearFileRef, dispatch, photoStored]
    );
};
