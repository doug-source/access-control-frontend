import { useInputRef } from '@/shared/hooks/useInputRef';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { RegisterPermissionsState } from '@/shared/types/Reducers/RegisterPermissions';
import { Paths } from '@/shared/types/Urls/Paths';

export const useDeps = (
    state: RegisterPermissionsState,
    endpoint: Paths['endpoint']['registerPermissionPaginations']
) => {
    const inputRef = useInputRef();
    usePaginationListData(endpoint, state, inputRef);
};
