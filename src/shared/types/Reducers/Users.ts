import { type UserIndex } from '@/shared/types/Models/User';
import { type PaginationAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { type RemotionAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type RemotionState } from '@/shared/types/Reducers/Custom/RemotionState';
import { type RestorationAction } from '@/shared/types/Reducers/Custom/RestorationAction';
import { type RestorationState } from '@/shared/types/Reducers/Custom/RestorationState';
import { type Resolve } from '@/shared/types/Utils';

type Complete = Resolve<
    PaginationState<UserIndex> & RemotionState & RestorationState
>;

export interface UsersState extends Complete {
    user: UserIndex | null;
    idToAttach: number | null;
}

interface IdToAttachAction<T> {
    type: 'to-attach';
    payload: T | null;
}

export type UsersAction =
    | PaginationAction<UserIndex>
    | RemotionAction<UserIndex>
    | RestorationAction<UserIndex>
    | IdToAttachAction<UserIndex>;
