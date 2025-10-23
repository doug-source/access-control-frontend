import { useActionHandlers } from '@/shared/hooks/useActionHandlers';
import { useSignState } from '@/shared/hooks/useSignState';
import type { UserIndex } from '@/shared/types/Models/User';

export const useDeps = (user: UserIndex) => {
    const { state } = useSignState();
    const abilities = state.user?.abilities ?? [];

    const {
        handler: removeHandler,
        pending: remotionPending,
        clickHandler: removeClickHandler,
        setShowConfirm: setShowConfirmRemotion,
        showConfirm: showConfirmRemotion,
    } = useActionHandlers(
        `/users/removed/remove/${user.id}`,
        'remotions',
        'user'
    );

    const {
        handler: restoreHandler,
        pending: restorePending,
        showConfirm: showConfirmRestoration,
        clickHandler: restoreClickHandler,
        setShowConfirm: setShowConfirmRestoration,
    } = useActionHandlers(`/users/restore/${user.id}`, 'restorations', 'user');

    return {
        abilities,

        removeHandler,
        remotionPending,

        removeClickHandler,
        setShowConfirmRemotion,
        showConfirmRemotion,

        restoreHandler,
        restorePending,

        restoreClickHandler,
        setShowConfirmRestoration,
        showConfirmRestoration,
    };
};
