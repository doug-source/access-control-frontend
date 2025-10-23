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
        case 'CONFIG_USER_UPDATING': {
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
        case 'CONFIG_CONFIRMATION_UPDATING': {
            if (state.user === null) {
                return state;
            }
            return {
                ...state,
                confirmations: {
                    ...state.confirmations,
                    remotions: {
                        ...state.confirmations.remotions,
                        ...action.payload.remotions,
                    },
                    approvements: {
                        ...state.confirmations.approvements,
                        ...action.payload.approvements,
                    },
                    attachment: {
                        ...state.confirmations.attachment,
                        ...action.payload.attachment,
                    },
                    detachment: {
                        ...state.confirmations.detachment,
                        ...action.payload.detachment,
                    },
                    restorations: {
                        ...state.confirmations.restorations,
                        ...action.payload.restorations,
                    },
                },
            };
        }
        default:
            assertUnreachable(action);
            break;
    }
};
