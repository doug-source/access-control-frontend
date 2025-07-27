import { standardReducer } from '@/shared/reducers/standardReducer';
import { type RegisterPermission } from '@/shared/types/Models/RegisterPermission';
import { type RegisterPermissionState } from '@/shared/types/Reducers/RegisterPermission';
import { type SingleDataAction } from '@/shared/types/Reducers/SingleData';

export const registerPermissionReducer = (
    state: RegisterPermissionState,
    action: SingleDataAction<RegisterPermission>
): RegisterPermissionState => {
    switch (action.type) {
        case 'success': {
            return {
                ...state,
                requestStatus: { statusCode: 200, message: 'OK' },
                registerPermission: action.payload,
            };
        }
        default: {
            return standardReducer(state, action);
        }
    }
};
