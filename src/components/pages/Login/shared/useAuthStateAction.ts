import { useGateDispatcher } from '@/shared/hooks/useGateDispatcher';
import type { State } from '@/shared/types/Reducers/Standard/State';
import { useCallback } from 'react';

export const useAuthStateAction = () => {
    const loginDipatcher = useGateDispatcher();

    return useCallback(
        async (prevState: State, formData: FormData) => {
            return loginDipatcher.request(prevState, formData);
        },
        [loginDipatcher]
    );
};
