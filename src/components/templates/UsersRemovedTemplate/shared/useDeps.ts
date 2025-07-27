import { useInputRef } from '@/shared/hooks/useInputRef';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { useRemoveHandler } from '@/shared/hooks/useRemoveHandler';
import { useRestoreHandler } from '@/shared/hooks/useRestoreHandler';
import { type UsersState } from '@/shared/types/Reducers/Users';

export const useDeps = (state: UsersState) => {
    const endpoint = '/api/users/removed';
    const inputRef = useInputRef();
    usePaginationListData(endpoint, state, inputRef);
    const removeHandler = useRemoveHandler(state.user, endpoint);
    const restoreHandler = useRestoreHandler(state.user, '/api/users/restore');
    return [removeHandler, restoreHandler] as const;
};
