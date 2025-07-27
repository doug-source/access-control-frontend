import { useApproveHandler } from '@/shared/hooks/useApproveHandler';
import { useInputRef } from '@/shared/hooks/useInputRef';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { useRemoveHandler } from '@/shared/hooks/useRemoveHandler';
import { RegisterRequestsState } from '@/shared/types/Reducers/RegisterRequests';
import { Paths } from '@/shared/types/Urls/Paths';

export const useDeps = (
    state: RegisterRequestsState,
    endpoint: Paths['endpoint']['registerRequestPaginations']
) => {
    const inputRef = useInputRef();
    usePaginationListData(endpoint, state, inputRef);
    const removeHandler = useRemoveHandler(state.registerRequest, endpoint);
    const approveHandler = useApproveHandler(
        state.registerRequest,
        `/api/registers/requests/${state.registerRequest?.id ?? 0}/approval`
    );
    return [removeHandler, approveHandler] as const;
};
