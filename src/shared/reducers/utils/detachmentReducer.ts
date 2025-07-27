import { type DetachmentAction } from '@/shared/types/Reducers/Custom/DetachmentAction';
import { type DetachmentState } from '@/shared/types/Reducers/Custom/DetachmentState';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { statePaginationAfterDecrease } from '@/shared/utils/statePaginationAfterDecrease';

export const detachmentReducer = <
    M extends { id: number },
    S extends DetachmentState & PaginationState<M>,
    A extends DetachmentAction<M>
>(
    state: S,
    action: A,
    key: string
): S => {
    switch (action.type) {
        case 'to-detach':
            return {
                ...state,
                [key]: action.payload,
                idDetached: action.payload?.id ?? null,
            };
        case 'detachment-success':
            return {
                ...statePaginationAfterDecrease(state),
                [key]: null,
                idDetached: null,
                data: state.data.filter((d) => d.id !== action.payload.id),
                requestType: null,
            };
        default:
            return state;
    }
};
