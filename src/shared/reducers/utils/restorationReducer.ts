import { PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { RestorationAction } from '@/shared/types/Reducers/Custom/RestorationAction';
import { RestorationState } from '@/shared/types/Reducers/Custom/RestorationState';
import { statePaginationAfterDecrease } from '@/shared/utils/statePaginationAfterDecrease';

export const restorationReducer = <
    M extends { id: number },
    S extends RestorationState & PaginationState<M>,
    A extends RestorationAction<M>
>(
    state: S,
    action: A,
    key: string
): S => {
    switch (action.type) {
        case 'to-restore':
            return {
                ...state,
                [key]: action.payload,
                idRestored: action.payload?.id ?? null,
            };
        case 'restoration-success':
            return {
                ...statePaginationAfterDecrease(state),
                [key]: null,
                idRestored: null,
                data: state.data.filter((d) => d.id !== action.payload.id),
                requestType: null,
            };
        default:
            return state;
    }
};
