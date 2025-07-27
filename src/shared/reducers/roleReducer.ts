import { standardReducer } from '@/shared/reducers/standardReducer';
import { type Role } from '@/shared/types/Models/Role';
import { type RoleState } from '@/shared/types/Reducers/Role';
import { type SingleDataAction } from '@/shared/types/Reducers/SingleData';

export const roleReducer = (
    state: RoleState,
    action: SingleDataAction<Role>
): RoleState => {
    switch (action.type) {
        case 'success': {
            return {
                ...state,
                requestStatus: { statusCode: 200, message: 'OK' },
                role: action.payload,
            };
        }
        default: {
            return standardReducer(state, action);
        }
    }
};
