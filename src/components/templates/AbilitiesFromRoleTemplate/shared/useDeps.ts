import { useAttachHandler } from '@/shared/hooks/useAttachHandler';
import { useDataToRequest } from '@/shared/hooks/useDataToRequest';
import { useDetachHandler } from '@/shared/hooks/useDetachHandler';
import { useOwnerInputRefs } from '@/shared/hooks/useOwnerInputRefs';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { RoleIndex } from '@/shared/types/Models/Role';
import { AbilitiesState } from '@/shared/types/Reducers/Abilities';

export const useDeps = (state: AbilitiesState) => {
    const [endpoint, info] = useDataToRequest<
        RoleIndex,
        `/api/roles/${number}/abilities`
    >((id) => `/api/roles/${id}/abilities`);

    const inputRefs = useOwnerInputRefs();

    usePaginationListData(endpoint, state, ...inputRefs);
    const attachHandler = useAttachHandler(
        state.ability,
        endpoint,
        state.ability?.name ?? ''
    );
    const dettachHandler = useDetachHandler(
        state.ability,
        endpoint,
        state.ability?.name ?? ''
    );
    return {
        inputRef: inputRefs[0],
        attachHandler,
        dettachHandler,
        info,
    };
};
