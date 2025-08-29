import { useAuth } from '@/shared/hooks/useAuth';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import type { LoginState } from '@/shared/types/States';
import { useCallback } from 'react';

export const useLoginCallback = () => {
    const auth = useAuth();
    const navigate = useLocalNavigate();
    return useCallback(
        async (output: Promise<LoginState>) => {
            const result = await output;
            if (result.requestStatus.statusCode === 200 && result.user) {
                const { user } = result;
                setTimeout(() => {
                    auth?.login(user);
                    navigate('/home', { replace: true });
                }, 1500);
            }
            return result;
        },
        [auth, navigate]
    );
};
