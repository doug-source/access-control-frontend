import { PhotoFile } from '@/components/molecules/PhotoFile';
import { useLogicBase } from '@/shared/hooks/useLogicBase';
import { useUnmountAbortRequest } from '@/shared/hooks/useUnmountAbortRequest';
import type { UserConfigState } from '@/shared/types/States';
import { ComponentRef, useCallback, useRef } from 'react';

export const useUserConfigStateAction = () => {
    const { dispatcher } = useLogicBase<unknown, UserConfigState>();
    const clearFileRef = useRef<ComponentRef<typeof PhotoFile> | null>(null);

    const submitHandler = useCallback(
        async (prevState: UserConfigState, formData: FormData) => {
            const state = dispatcher.request(prevState, formData);
            if ((await state).requestStatus.statusCode === 200) {
                clearFileRef.current?.clear();
            }
            return state;
        },
        [dispatcher]
    );
    useUnmountAbortRequest(dispatcher);
    return [submitHandler, clearFileRef] as const;
};
