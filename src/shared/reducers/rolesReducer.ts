import { standardReducer } from '@/shared/reducers/standardReducer';
import { attachmentReducer } from '@/shared/reducers/utils/attachmentReducer';
import { detachmentReducer } from '@/shared/reducers/utils/detachmentReducer';
import { paginationReducer } from '@/shared/reducers/utils/paginationReducer';
import { remotionReducer } from '@/shared/reducers/utils/remotionReducer';
import {
    type RolesAction,
    type RolesState,
} from '@/shared/types/Reducers/Roles';
import type { PaginateKeyContext } from '@/shared/utils/pagination';

export const rolesReducer = (context: PaginateKeyContext, id: number) => {
    return (state: RolesState, action: RolesAction): RolesState => {
        switch (action.type) {
            case 'to-remove':
            case 'remotion-success':
                return remotionReducer(state, action, 'role');
            case 'to-detach':
            case 'detachment-success':
                return detachmentReducer(state, action, 'role');
            case 'change-filter':
            case 'change-page':
            case 'change-group':
            case 'pagination-success':
                return paginationReducer(state, action, context, id);
            case 'to-attach':
            case 'attachment-success':
                return attachmentReducer(state, action, 'role');
            default: {
                const standardState = standardReducer(state, action);
                return { ...standardState, requestType: null };
            }
        }
    };
};
