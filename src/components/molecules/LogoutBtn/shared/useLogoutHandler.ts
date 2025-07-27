import { useAuth } from '@/shared/hooks/useAuth';
import { useAuthenticator } from '@/shared/hooks/useAuthenticator';
import { useCallback } from 'react';

export const useLogoutHandler = (onLoading: (loading: boolean) => void) => {
    const auth = useAuth();
    const authenticator = useAuthenticator();
    return useCallback(async () => {
        if (!auth?.user?.token) {
            auth?.logout();
            return;
        }
        onLoading(true);
        await authenticator.logout(auth.user.token);
        onLoading(false);
        auth?.logout();
    }, [auth, onLoading, authenticator]);
};
