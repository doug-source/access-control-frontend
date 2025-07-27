import {
    type ResetPasswordAction,
    type ResetPasswordState,
} from '@/shared/types/Reducers/Guest/ChangePassword';
import { standardReducer } from './standardReducer';

export const resetPasswordReducer = (
    state: ResetPasswordState,
    action: ResetPasswordAction
): ResetPasswordState => {
    switch (action.type) {
        case 'success':
            return {
                ...state,
                requestStatus: { statusCode: 200, message: '' },
                ...action.payload,
            };
        default: {
            return standardReducer(state, action);
        }
    }
};
