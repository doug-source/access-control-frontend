import { useAuth } from '@/shared/hooks/useAuth';
import { type UserIndex } from '@/shared/types/Models/User';
import { useCallback } from 'react';

export const useMakeUserChecking = () => {
    const auth = useAuth();
    return useCallback(
        (user: UserIndex) => user.id === Number(auth?.user?.id),
        [auth]
    );
};
