import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { useRemoveHandler } from '@/shared/hooks/useRemoveHandler';
import { useSignState } from '@/shared/hooks/useSignState';
import { RolesState } from '@/shared/types/Reducers/Roles';
import { useRef } from 'react';

export const useDeps = (state: RolesState) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    usePaginationListData('/api/roles', state, inputRef);
    const removeHandler = useRemoveHandler(state.role, '/api/roles');
    const abilities = useSignState().state.user?.abilities ?? [];
    return { removeHandler, inputRef, abilities };
};
