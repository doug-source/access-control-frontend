import { useActionHandlers } from '@/shared/hooks/useActionHandlers';
import { useSignState } from '@/shared/hooks/useSignState';
import { useToAbilityRouteHandler } from '@/shared/hooks/useToAbilityRouteHandler';
import { type RoleIndex } from '@/shared/types/Models/Role';

export const useDeps = (role: RoleIndex) => {
    const abilities = useSignState().state.user?.abilities ?? [];
    const abilitiesHandler = useToAbilityRouteHandler<HTMLButtonElement>({
        from: 'role',
    });
    const abilitiesToAttachHandler =
        useToAbilityRouteHandler<HTMLButtonElement>({
            from: 'role',
            attach: true,
        });

    const {
        clickHandler: removeClickHandler,
        handler: removeHandler,
        pending: remotionPending,
        setShowConfirm: setShowConfirmRemotion,
        showConfirm: showConfirmRemotion,
    } = useActionHandlers(`/roles/remove/${role.id}`, 'remotions', 'role');
    return {
        abilities,
        abilitiesHandler,
        abilitiesToAttachHandler,

        remotionPending,
        showConfirmRemotion,
        setShowConfirmRemotion,
        removeHandler,
        removeClickHandler,
    };
};
