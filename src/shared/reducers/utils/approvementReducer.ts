import { type ApprovementAction } from '@/shared/types/Reducers/Custom/ApprovementAction';
import { type ApprovementState } from '@/shared/types/Reducers/Custom/ApprovementState';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { statePaginationAfterDecrease } from '@/shared/utils/statePaginationAfterDecrease';

export const approvementReducer = <
    M extends { id: number },
    S extends ApprovementState & PaginationState<M>,
    A extends ApprovementAction<M>
>(
    state: S,
    action: A,
    key: string
): S => {
    switch (action.type) {
        case 'to-approve':
            return {
                ...state,
                [key]: action.payload,
                idApproved: action.payload?.id ?? null,
            };
        case 'approvement-success':
            return {
                ...statePaginationAfterDecrease(state),
                [key]: null,
                idApproved: null,
                data: state.data.filter((d) => d.id !== action.payload.id),
                requestType: null,
            };
        default:
            return state;
    }
};
