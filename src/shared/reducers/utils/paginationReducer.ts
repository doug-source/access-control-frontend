import type { PaginationAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import type { PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { groups } from '@/shared/utils/pagination';

export const paginationReducer = <
    M,
    S extends PaginationState<M>,
    A extends PaginationAction<M>
>(
    state: S,
    action: A
): S => {
    switch (action.type) {
        case 'change-filter': {
            return {
                ...state,
                page: 1,
                group: groups[0],
                requestStatus: { statusCode: 0 },
                requestType: 'list',
            };
        }
        case 'change-page': {
            return {
                ...state,
                page: action.payload,
                requestStatus: { statusCode: 0 },
                requestType: 'list',
            };
        }
        case 'change-group': {
            return {
                ...state,
                group: action.payload,
                requestStatus: { statusCode: 0 },
                requestType: 'list',
            };
        }
        case 'pagination-success': {
            const { payload } = action;
            return {
                ...state,
                requestStatus: { statusCode: 200, message: 'OK' },
                ...payload,
                requestType: null,
            };
        }
        default:
            return state;
    }
};
