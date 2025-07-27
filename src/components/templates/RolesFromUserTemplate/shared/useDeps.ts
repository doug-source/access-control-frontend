import { useAttachHandler } from '@/shared/hooks/useAttachHandler';
import { useDetachHandler } from '@/shared/hooks/useDetachHandler';
import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import { useOwnerInputRefs } from '@/shared/hooks/useOwnerInputRefs';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { type LocationStateBetweenScreen } from '@/shared/types/LocationStateBetweenScreen';
import { type UserIndex } from '@/shared/types/Models/User';
import { type RolesState } from '@/shared/types/Reducers/Roles';
import { useParams } from 'react-router';

export const useDeps = (state: RolesState) => {
    const inputRefs = useOwnerInputRefs();
    const params = useParams();
    const endpoint = `/api/users/${Number(params.id ?? 0)}/roles` as const;

    usePaginationListData(endpoint, state, ...inputRefs);

    const attachHandler = useAttachHandler(
        state.role,
        endpoint,
        state.role?.name ?? ''
    );
    const detachHandler = useDetachHandler(
        state.role,
        endpoint,
        state.role?.name ?? ''
    );
    const { state: info } = useLocalLocation();
    return {
        inputRef: inputRefs[0],
        attachHandler,
        detachHandler,
        info: info as LocationStateBetweenScreen<UserIndex>,
    };
};
