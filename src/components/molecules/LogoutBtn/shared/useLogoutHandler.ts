import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useSignState } from '@/shared/hooks/useSignState';
import { useUnauthenticator } from '@/shared/hooks/useUnauthenticator';
import { useCallback } from 'react';

export const useLogoutHandler = (onLoading: (loading: boolean) => void) => {
    const { state, dispatch } = useSignState();
    const token = state.user?.token;
    const unauthenticator = useUnauthenticator();
    const navigate = useLocalNavigate();
    return useCallback(async () => {
        if (!token) {
            dispatch({ type: 'SIGN_OUT' });
            return;
        }
        onLoading(true);
        await unauthenticator.signOut();
        onLoading(false);
        dispatch({ type: 'SIGN_OUT' });
        navigate('/', { replace: true });
    }, [token, onLoading, unauthenticator, dispatch, navigate]);
};
