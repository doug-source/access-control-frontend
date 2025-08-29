import { useAuth } from '@/shared/hooks/useAuth';
import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useUnauthenticator } from '@/shared/hooks/useUnauthenticator';
import { useCallback } from 'react';

export const useLogoutHandler = (onLoading: (loading: boolean) => void) => {
    const auth = useAuth();
    const unauthenticator = useUnauthenticator();
    const navigate = useLocalNavigate();
    return useCallback(async () => {
        if (!auth?.user?.token) {
            auth?.logout();
            return;
        }
        onLoading(true);
        await unauthenticator.signOut();
        onLoading(false);
        auth?.logout();
        navigate('/', { replace: true });
    }, [auth, onLoading, unauthenticator, navigate]);
};
