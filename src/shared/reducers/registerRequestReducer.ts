import { standardReducer } from '@/shared/reducers/standardReducer';
import { type RegisterRequest } from '@/shared/types/Models/RegisterRequest';
import { type RegisterRequestState } from '@/shared/types/Reducers/RegisterRequest';
import { type SingleDataAction } from '@/shared/types/Reducers/SingleData';

export const registerRequestReducer = (
    state: RegisterRequestState,
    action: SingleDataAction<RegisterRequest>
): RegisterRequestState => {
    switch (action.type) {
        case 'success': {
            return {
                ...state,
                requestStatus: { statusCode: 200, message: 'OK' },
                registerRequest: action.payload,
            };
        }
        default: {
            return standardReducer(state, action);
        }
    }
};
