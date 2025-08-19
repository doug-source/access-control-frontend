import { useAuth } from '@/shared/hooks/useAuth';
import { useUnauthenticator } from '@/shared/hooks/useUnauthenticator';
import { useCallback } from 'react';

export const useLogoutHandler = (onLoading: (loading: boolean) => void) => {
    const auth = useAuth();
    const unauthenticator = useUnauthenticator();
    return useCallback(async () => {
        if (!auth?.user?.token) {
            auth?.logout();
            return;
        }
        onLoading(true);
        await unauthenticator.signOut();
        onLoading(false);
        auth?.logout();
    }, [auth, onLoading, unauthenticator]);
};
