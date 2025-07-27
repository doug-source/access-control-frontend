import type {
    UserConfigAction,
    UserConfigState,
} from '@/shared/types/Reducers/UserConfig';
import { standardReducer } from './standardReducer';

export const userConfigReducer = (
    state: UserConfigState,
    action: UserConfigAction
) => {
    switch (action.type) {
        case 'photo-chosen-change': {
            return { ...state, photoChosen: action.payload };
        }
        default: {
            const standardState = standardReducer(state, action);
            return { ...standardState };
        }
    }
};
