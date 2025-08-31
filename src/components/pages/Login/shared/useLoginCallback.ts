import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useSignDispatch } from '@/shared/hooks/useSignDispatch';
import type { LoginState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useLoginCallback = () => {
    const dispatch = useSignDispatch();
    const navigate = useLocalNavigate();
    return useCallback(
        async (output: Promise<LoginState>) => {
            const result = await output;
            if (result.requestStatus.statusCode === 200 && result.user) {
                const { user } = result;
                setTimeout(() => {
                    dispatch({ type: 'SIGN_IN', payload: user });

                    navigate('/home', { replace: true });
                }, 1500);
            }
            return result;
        },
        [dispatch, navigate]
    );
};
