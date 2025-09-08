import { useSignState } from '@/shared/hooks/useSignState';
import type { LoginState } from '@/shared/types/States';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export const useLoginCallback = () => {
    const { dispatch } = useSignState();
    const navigate = useNavigate();
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
