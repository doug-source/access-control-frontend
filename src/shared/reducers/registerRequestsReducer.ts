import { standardReducer } from '@/shared/reducers/standardReducer';
import { approvementReducer } from '@/shared/reducers/utils/approvementReducer';
import { paginationReducer } from '@/shared/reducers/utils/paginationReducer';
import { remotionReducer } from '@/shared/reducers/utils/remotionReducer';
import {
    type RegisterRequestsAction,
    type RegisterRequestsState,
} from '@/shared/types/Reducers/RegisterRequests';

export const registerRequestsReducer = (
    state: RegisterRequestsState,
    action: RegisterRequestsAction
): RegisterRequestsState => {
    switch (action.type) {
        case 'to-remove':
        case 'remotion-success':
            return remotionReducer(state, action, 'registerRequest');
        case 'to-approve':
        case 'approvement-success':
            return approvementReducer(state, action, 'registerRequest');
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
