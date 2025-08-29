import { useLogicBase } from '@/shared/hooks/useLogicBase';
import { useUnmountAbortRequest } from '@/shared/hooks/useUnmountAbortRequest';
import type { LogicBaseStates } from '@/shared/types/Responsabilities/States';
import { useCallback } from 'react';

export const useLogicBaseStateAction = <T extends LogicBaseStates>() => {
    const { dispatcher } = useLogicBase<unknown, T>();
    useUnmountAbortRequest(dispatcher);

    return useCallback(
        async (prevState: T, formData: FormData) => {
            return dispatcher.request(prevState, formData);
        },
        [dispatcher]
    );
};
