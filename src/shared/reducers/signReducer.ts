import type { SignAction, SignState } from '@/shared/types/Reducers/Sign';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

export const signReducer = (
    state: SignState,
    action: SignAction
): SignState => {
    switch (action.type) {
        case 'SIGN_IN': {
            return {
                ...state,
                user: action.payload,
            };
        }
        case 'SIGN_OUT': {
            return {
                ...state,
                user: null,
            };
        }
        case 'EMAIL_VALIDATED': {
            if (state.user === null) {
                return state;
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    emailVerified: true,
                },
            };
        }
        case 'CONFIG_UPDATING': {
            if (state.user === null) {
                return state;
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        }
        default:
            assertUnreachable(action);
            break;
    }
};
