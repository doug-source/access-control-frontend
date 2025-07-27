import { type RoleIndex } from '@/shared/types/Models/Role';
import { type AttachmentAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { type AttachmentState } from '@/shared/types/Reducers/Custom/AttachmentState';
import { type DetachmentAction } from '@/shared/types/Reducers/Custom/DetachmentAction';
import { type DetachmentState } from '@/shared/types/Reducers/Custom/DetachmentState';
import { type PaginationAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { type RemotionAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type RemotionState } from '@/shared/types/Reducers/Custom/RemotionState';
import { type Resolve } from '@/shared/types/Utils';

type Complete = Resolve<
    PaginationState<RoleIndex> &
        RemotionState &
        DetachmentState &
        AttachmentState
>;

export interface RolesState extends Complete {
    role: RoleIndex | null;
}

export type RolesAction =
    | PaginationAction<RoleIndex>
    | RemotionAction<RoleIndex>
    | DetachmentAction<RoleIndex>
    | AttachmentAction<RoleIndex>;
