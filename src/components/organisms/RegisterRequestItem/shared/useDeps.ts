import { useActionHandlers } from '@/shared/hooks/useActionHandlers';
import { useSignState } from '@/shared/hooks/useSignState';
import type { RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';

export const useDeps = (registerRequest: RegisterRequestIndex) => {
    const abilities = useSignState().state.user?.abilities ?? [];

    const {
        handler: removeHandler,
        clickHandler: removeClickHandler,
        setShowConfirm: setShowConfirmRemotion,
        showConfirm: showConfirmRemotion,
        pending: remotionPending,
    } = useActionHandlers(
        `/register/requests/remove/${registerRequest.id}`,
        'remotions',
        'registerRequest'
    );
    const {
        handler: approvalHandler,
        clickHandler: approvalClickHandler,
        setShowConfirm: setShowConfirmApproval,
        showConfirm: showConfirmApproval,
        pending: approvalPending,
    } = useActionHandlers(
        `/register/requests/approval/${registerRequest.id}`,
        'approvements',
        'registerRequest'
    );
    return {
        abilities,

        removeClickHandler,
        setShowConfirmRemotion,
        showConfirmRemotion,
        removeHandler,
        remotionPending,

        approvalClickHandler,
        setShowConfirmApproval,
        showConfirmApproval,
        approvalHandler,
        approvalPending,
    };
};
