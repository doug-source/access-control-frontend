import { standardReducer } from '@/shared/reducers/standardReducer';
import { paginationReducer } from '@/shared/reducers/utils/paginationReducer';
import {
    type RegisterPermissionsAction,
    type RegisterPermissionsState,
} from '@/shared/types/Reducers/RegisterPermissions';

export const registerPermissionsReducer = (
    state: RegisterPermissionsState,
    action: RegisterPermissionsAction
): RegisterPermissionsState => {
    switch (action.type) {
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
