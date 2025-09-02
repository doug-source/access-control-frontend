import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import { useSignState } from '@/shared/hooks/useSignState';
import { useId } from 'react';

export const useDeps = () => {
    const { pathname } = useLocalLocation();
    const usersMenuId = useId();
    const abilities = useSignState().state.user?.abilities ?? [];

    return {
        pathname,
        usersMenuId,
        abilities,
    };
};
