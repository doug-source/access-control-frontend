import {
    type AttachmentAction,
    type AttachmentActionModels,
} from '@/shared/types/Reducers/Custom/AttachmentAction';
import { type AttachmentState } from '@/shared/types/Reducers/Custom/AttachmentState';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { statePaginationAfterDecrease } from '@/shared/utils/statePaginationAfterDecrease';

export const attachmentReducer = <
    M extends AttachmentActionModels,
    S extends AttachmentState & PaginationState<M>,
    A extends AttachmentAction<M>
>(
    state: S,
    action: A,
    key: string
): S => {
    switch (action.type) {
        case 'to-attach':
            return {
                ...state,
                [key]: action.payload,
                idAttached: action.payload?.id ?? null,
            };
        case 'attachment-success':
            return {
                ...statePaginationAfterDecrease(state),
                [key]: null,
                idAttached: null,
                data: state.data.filter((d) => d.id !== action.payload.id),
                requestType: null,
            };
        default:
            return state;
    }
};
