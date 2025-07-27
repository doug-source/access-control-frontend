import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import {
    RemotionActionModels,
    type RemotionAction,
} from '@/shared/types/Reducers/Custom/RemotionAction';
import { type RemotionState } from '@/shared/types/Reducers/Custom/RemotionState';
import { statePaginationAfterDecrease } from '@/shared/utils/statePaginationAfterDecrease';

export const remotionReducer = <
    M extends RemotionActionModels,
    S extends RemotionState & PaginationState<M>,
    A extends RemotionAction<M>
>(
    state: S,
    action: A,
    key: string
): S => {
    switch (action.type) {
        case 'to-remove':
            return {
                ...state,
                [key]: action.payload,
                idRemoved: action.payload?.id ?? null,
            };
        case 'remotion-success':
            return {
                ...statePaginationAfterDecrease(state),
                [key]: null,
                idRemoved: null,
                data: state.data.filter((d) => d.id !== action.payload.id),
                requestType: null,
            };
        default:
            return state;
    }
};
