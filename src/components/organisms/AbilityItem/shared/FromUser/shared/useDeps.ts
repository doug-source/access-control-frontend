import { useActionHandlers } from '@/shared/hooks/useActionHandlers';
import { useSignState } from '@/shared/hooks/useSignState';
import type { AbilityIndex } from '@/shared/types/Models/Ability';
import { pickParamId } from '@/shared/utils/pickParamId';
import { useLocation, useParams } from 'react-router';

export const useDeps = (ability: AbilityIndex) => {
    const abilities = useSignState().state.user?.abilities ?? [];
    const { pathname } = useLocation();
    const id = pickParamId(useParams());
    const {
        clickHandler: attachClickHandler,
        handler: attachHandler,
        pending: attachPending,
        setShowConfirm: setShowConfirmAttach,
        showConfirm: showConfirmAttach,
    } = useActionHandlers(
        `/abilities/user/${id}/attach?names=${ability.name}`,
        'attachment',
        'ability'
    );
    const {
        clickHandler: detachClickHandler,
        handler: detachHandler,
        pending: detachPending,
        setShowConfirm: setShowConfirmDetach,
        showConfirm: showConfirmDetach,
    } = useActionHandlers(
        `/abilities/user/${id}?names=${ability.name}`,
        'detachment',
        'ability'
    );

    return {
        abilities,
        pathname,

        attachClickHandler,
        attachHandler,
        attachPending,
        setShowConfirmAttach,
        showConfirmAttach,

        detachClickHandler,
        detachHandler,
        detachPending,
        setShowConfirmDetach,
        showConfirmDetach,
    };
};
