import { type RegisterAccountState } from '@/shared/types/Reducers/Guest/RegisterAccount';
import { type Action } from '@/shared/types/Reducers/Standard/Action';
import { standardReducer } from './standardReducer';

export const registerAccountReducer = (
    state: RegisterAccountState,
    action: Action
): RegisterAccountState => {
    switch (action.type) {
        case 'success':
            return {
                ...state,
                requestStatus: { statusCode: 200, message: '' },
                token: action.payload,
            };
        default: {
            return standardReducer(state, action);
        }
    }
};
