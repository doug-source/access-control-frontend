import type { PaginationAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import type { PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import {
    groups,
    type PaginateKeyContext,
    storePagination,
} from '@/shared/utils/pagination';

export const paginationReducer = <
    M,
    S extends PaginationState<M>,
    A extends PaginationAction<M>
>(
    state: S,
    action: A,
    context?: PaginateKeyContext,
    id?: number
): S => {
    switch (action.type) {
        case 'change-filter': {
            if (context && id) {
                storePagination(context, 'page', 1, id);
                storePagination(context, 'group', groups[0], id);
            }
            return {
                ...state,
                page: 1,
                requestStatus: { statusCode: 0 },
                requestType: 'list',
            };
        }
        case 'change-page': {
            if (context && id) {
                storePagination(context, 'page', action.payload, id);
            }
            return {
                ...state,
                page: action.payload,
                requestStatus: { statusCode: 0 },
                requestType: 'list',
            };
        }
        case 'change-group': {
            if (context && id) {
                storePagination(context, 'group', action.payload, id);
            }
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
