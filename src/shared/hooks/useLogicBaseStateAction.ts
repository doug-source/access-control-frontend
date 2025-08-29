import { useLogicBase } from '@/shared/hooks/useLogicBase';
import { useUnmountAbortRequest } from '@/shared/hooks/useUnmountAbortRequest';
import type { LogicBaseStates } from '@/shared/types/Responsabilities/States';
import { useCallback } from 'react';

export const useLogicBaseStateAction = <T extends LogicBaseStates>(
    callback?: (output: Promise<T>) => Promise<T>
) => {
    const { dispatcher } = useLogicBase<unknown, T>();
    useUnmountAbortRequest(dispatcher);

    return useCallback(
        async (prevState: T, formData: FormData) => {
            const output = dispatcher.request(prevState, formData);
            if (callback) {
                return callback(output);
            }
            return output;
        },
        [dispatcher, callback]
    );
};
