import { useDispatch } from '@/shared/hooks/useDispatch';
import { useInputRef } from '@/shared/hooks/useInputRef';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { useRemoveHandler } from '@/shared/hooks/useRemoveHandler';
import { useSignState } from '@/shared/hooks/useSignState';
import type { IdToAttachAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import type { UsersState } from '@/shared/types/Reducers/Users';

export const useDeps = (state: UsersState) => {
    const endpoint = '/api/users';
    const inputRef = useInputRef();
    usePaginationListData(endpoint, state, inputRef);
    const removeHandler = useRemoveHandler(state.user, endpoint);
    const dispatch = useDispatch<IdToAttachAction<null>>();
    const abilities = useSignState().state.user?.abilities ?? [];

    return {
        removeHandler,
        dispatch,
        canAddUser: abilities.includes('add-user-screen'),
    };
};
