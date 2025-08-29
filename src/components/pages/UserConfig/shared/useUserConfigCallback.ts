import type { PhotoFile } from '@/components/molecules/PhotoFile';
import { useAuth } from '@/shared/hooks/useAuth';
import type { UserConfigState } from '@/shared/types/States';
import { type ComponentRef, useCallback } from 'react';

export const useUserConfigCallback = (
    clearFileRef: React.RefObject<ComponentRef<typeof PhotoFile> | null>
) => {
    const auth = useAuth();
    return useCallback(
        async (output: Promise<UserConfigState>) => {
            const result = await output;
            if (result.requestStatus.statusCode === 200) {
                auth?.updateAuthUser(
                    result.fields.name,
                    result.fields.phone ?? null,
                    result.fields.photo ?? auth?.user?.photo ?? null
                );
                clearFileRef.current?.clear();
            }
            return result;
        },
        [clearFileRef, auth]
    );
};
