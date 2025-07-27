import { type User } from '@/shared/types/Models/User';
import { type SingleDataAction } from '@/shared/types/Reducers/SingleData';
import { type UserState } from '@/shared/types/Reducers/User';
import { standardReducer } from './standardReducer';

export const userReducer = (
    state: UserState,
    action: SingleDataAction<User>
): UserState => {
    switch (action.type) {
        case 'success': {
            return {
                ...state,
                requestStatus: { statusCode: 200, message: 'OK' },
                user: action.payload,
            };
        }
        default: {
            return standardReducer(state, action);
        }
    }
};
