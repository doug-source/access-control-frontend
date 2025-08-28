import { standardReducer } from '@/shared/reducers/standardReducer';
import { attachmentReducer } from '@/shared/reducers/utils/attachmentReducer';
import { detachmentReducer } from '@/shared/reducers/utils/detachmentReducer';
import { paginationReducer } from '@/shared/reducers/utils/paginationReducer';
import { remotionReducer } from '@/shared/reducers/utils/remotionReducer';
import {
    type AbilitiesAction,
    type AbilitiesState,
} from '@/shared/types/Reducers/Abilities';
import type { PaginateKeyContext } from '@/shared/utils/pagination';

export const abilitiesReducer = (context: PaginateKeyContext, id: number) => {
    return (state: AbilitiesState, action: AbilitiesAction): AbilitiesState => {
        switch (action.type) {
            case 'to-remove':
            case 'remotion-success':
                return remotionReducer(state, action, 'ability');
            case 'change-filter':
            case 'change-page':
            case 'change-group':
            case 'pagination-success':
                return paginationReducer(state, action, context, id);
            case 'to-attach':
            case 'attachment-success':
                return attachmentReducer(state, action, 'ability');
            case 'to-detach':
            case 'detachment-success':
                return detachmentReducer(state, action, 'ability');
            default: {
                const standardState = standardReducer(state, action);
                return { ...standardState, requestType: null };
            }
        }
    };
};
