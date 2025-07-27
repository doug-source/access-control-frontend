import { useAttachHandler } from '@/shared/hooks/useAttachHandler';
import { useAuth } from '@/shared/hooks/useAuth';
import { useOwnerInputRefs } from '@/shared/hooks/useOwnerInputRefs';
import { usePaginationListData } from '@/shared/hooks/usePaginationListData';
import { useRemoveHandler } from '@/shared/hooks/useRemoveHandler';
import { AbilitiesState } from '@/shared/types/Reducers/Abilities';
import { useAbilityEndpoints } from './useAbilityEndpoints';

export const useDeps = (state: AbilitiesState) => {
    const [endpointPagination, endpointRemotion, info] = useAbilityEndpoints();
    const inputRefs = useOwnerInputRefs();
    const abilities = useAuth()?.abilities ?? [];

    usePaginationListData(endpointPagination, state, ...inputRefs);
    const removeHandler = useRemoveHandler(state.ability, endpointRemotion);
    const attachHandler = useAttachHandler(
        state.ability,
        `/api/roles/${info?.data.id ?? 0}/abilities`,
        state.ability?.name ?? ''
    );
    return {
        inputRef: inputRefs[0],
        removeHandler,
        attachHandler,
        info,
        abilities,
    };
};
