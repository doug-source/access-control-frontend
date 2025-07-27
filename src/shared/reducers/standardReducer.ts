import { type Action } from '@/shared/types/Reducers/Standard/Action';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { assertUnreachable } from '@/shared/utils/assertUnreachable';

export const standardReducer = <T extends State = State>(
    state: T,
    action: Action
): T => {
    switch (action.type) {
        case 'loading':
            return { ...state, requestStatus: { statusCode: 0 } };
        case 'success':
            return {
                ...state,
                requestStatus: { statusCode: 200, message: action.payload },
            };
        case 'error':
            if (action.payload.type === 'generic') {
                return {
                    ...state,
                    requestStatus: {
                        statusCode: 422,
                        type: action.payload.type,
                        message: action.payload.message,
                    },
                };
            }
            return {
                ...state,
                requestStatus: {
                    statusCode: 422,
                    type: action.payload.type,
                    message: action.payload.message,
                    field: action.payload.field,
                },
            };
        default: {
            assertUnreachable(action);
        }
    }
};
