import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type AttachmentAction } from '@/shared/types/Reducers/Custom/AttachmentAction';
import { type AttachmentState } from '@/shared/types/Reducers/Custom/AttachmentState';
import { type DetachmentState } from '@/shared/types/Reducers/Custom/DetachmentState';
import { type PaginationAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { type RemotionAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type RemotionState } from '@/shared/types/Reducers/Custom/RemotionState';
import { type Resolve } from '@/shared/types/Utils';
import { DetachmentAction } from './Custom/DetachmentAction';

type Complete = Resolve<
    PaginationState<AbilityIndex> &
        RemotionState &
        AttachmentState &
        DetachmentState
>;

export interface AbilitiesState extends Complete {
    ability: AbilityIndex | null;
}

export type AbilitiesAction =
    | PaginationAction<AbilityIndex>
    | RemotionAction<AbilityIndex>
    | AttachmentAction<AbilityIndex>
    | DetachmentAction<AbilityIndex>;
