import { useActionHandlers } from '@/shared/hooks/useActionHandlers';
import { useSignState } from '@/shared/hooks/useSignState';
import type { AbilityIndex } from '@/shared/types/Models/Ability';

export const useDeps = (ability: AbilityIndex) => {
    const abilities = useSignState().state.user?.abilities ?? [];
    const {
        clickHandler: removeClickHandler,
        handler: removeHandler,
        pending: remotionPending,
        setShowConfirm: setShowConfirmRemotion,
        showConfirm: showConfirmRemotion,
    } = useActionHandlers(
        `/abilities/remove/${ability.id}`,
        'remotions',
        'ability'
    );

    return {
        abilities,

        removeClickHandler,
        removeHandler,
        remotionPending,
        setShowConfirmRemotion,
        showConfirmRemotion,
    };
};
