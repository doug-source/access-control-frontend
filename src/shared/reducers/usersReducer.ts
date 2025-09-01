import { standardReducer } from '@/shared/reducers/standardReducer';
import { paginationReducer } from '@/shared/reducers/utils/paginationReducer';
import { remotionReducer } from '@/shared/reducers/utils/remotionReducer';
import { restorationReducer } from '@/shared/reducers/utils/restorationReducer';
import type { UsersAction, UsersState } from '@/shared/types/Reducers/Users';

export const usersReducer = (
    state: UsersState,
    action: UsersAction
): UsersState => {
    switch (action.type) {
        case 'to-attach':
            return {
                ...state,
                user: action.payload,
                idToAttach: action.payload?.id ?? null,
            };
        case 'to-remove':
        case 'remotion-success':
            return remotionReducer(state, action, 'user');
        case 'to-restore':
        case 'restoration-success':
            return restorationReducer(state, action, 'user');
        case 'change-filter':
        case 'change-page':
        case 'change-group':
        case 'pagination-success':
            return paginationReducer(state, action);
        default: {
            const standardState = standardReducer(state, action);
            return { ...standardState, requestType: null };
        }
    }
};
