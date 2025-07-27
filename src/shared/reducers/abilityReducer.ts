import { standardReducer } from '@/shared/reducers/standardReducer';
import { type Ability } from '@/shared/types/Models/Ability';
import { type AbilityState } from '@/shared/types/Reducers/Ability';
import { type SingleDataAction } from '@/shared/types/Reducers/SingleData';

export const abilityReducer = (
    state: AbilityState,
    action: SingleDataAction<Ability>
): AbilityState => {
    switch (action.type) {
        case 'success': {
            return {
                ...state,
                requestStatus: { statusCode: 200, message: 'OK' },
                ability: action.payload,
            };
        }
        default: {
            return standardReducer(state, action);
        }
    }
};
