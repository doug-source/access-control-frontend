import { useAuth } from '@/shared/hooks/useAuth';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { useRemoveHandler } from '@/shared/hooks/useRemoveHandler';
import { RolesState } from '@/shared/types/Reducers/Roles';
import { useRef } from 'react';

export const useDeps = (state: RolesState) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    usePaginationListData('/api/roles', state, inputRef);
    const removeHandler = useRemoveHandler(state.role, '/api/roles');
    const abilities = useAuth()?.abilities ?? [];
    return { removeHandler, inputRef, abilities };
};
