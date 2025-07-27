import { useAuth } from '@/shared/hooks/useAuth';
import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import { useId } from 'react';

export const useDeps = () => {
    const { pathname } = useLocalLocation();
    const usersMenuId = useId();
    const auth = useAuth();

    return {
        pathname,
        usersMenuId,
        abilities: auth?.abilities ?? [],
    };
};
