import { useSignState } from '@/shared/hooks/useSignState';
import { useId } from 'react';
import { useLocation } from 'react-router';

export const useDeps = () => {
    const { pathname } = useLocation();
    const usersMenuId = useId();
    const abilities = useSignState().state.user?.abilities ?? [];

    return {
        pathname,
        usersMenuId,
        abilities,
    };
};
