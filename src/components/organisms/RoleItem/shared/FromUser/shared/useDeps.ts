import { useActionHandlers } from '@/shared/hooks/useActionHandlers';
import { useSignState } from '@/shared/hooks/useSignState';
import type { RoleIndex } from '@/shared/types/Models/Role';
import { pickParamId } from '@/shared/utils/pickParamId';
import { useLocation, useParams } from 'react-router';

export const useDeps = (role: RoleIndex) => {
    const abilities = useSignState().state.user?.abilities ?? [];
    const { pathname } = useLocation();
    const id = pickParamId(useParams());
    const {
        clickHandler: attachClickHandler,
        handler: attachHandler,
        pending: attachPending,
        setPending: setAttachPending,
        setShowConfirm: setShowConfirmAttach,
        showConfirm: showConfirmAttach,
    } = useActionHandlers(
        `/roles/user/${id}/attach?names=${role.name}`,
        'attachment',
        'role'
    );
    const {
        clickHandler: detachClickHandler,
        handler: detachHandler,
        pending: detachPending,
        setPending: setDetachPending,
        setShowConfirm: setShowConfirmDetach,
        showConfirm: showConfirmDetach,
    } = useActionHandlers(
        `/roles/user/${id}?names=${role.name}`,
        'detachment',
        'role'
    );

    return {
        abilities,
        pathname,

        attachClickHandler,
        attachHandler,
        attachPending,
        setAttachPending,
        setShowConfirmAttach,
        showConfirmAttach,

        detachClickHandler,
        detachHandler,
        detachPending,
        setDetachPending,
        setShowConfirmDetach,
        showConfirmDetach,
    };
};
