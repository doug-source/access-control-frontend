import { useLocalNavigate } from '@/shared/hooks/useLocalNavigate';
import { useSignDispatch } from '@/shared/hooks/useSignDispatch';
import { useSignState } from '@/shared/hooks/useSignState';
import { useUnauthenticator } from '@/shared/hooks/useUnauthenticator';
import { useCallback } from 'react';

export const useLogoutHandler = (onLoading: (loading: boolean) => void) => {
    const token = useSignState().user?.token;
    const dispatch = useSignDispatch();
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
