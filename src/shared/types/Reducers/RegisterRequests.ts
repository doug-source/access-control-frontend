import { type Resolve } from '@//shared/types/Utils';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type ApprovementAction } from '@/shared/types/Reducers/Custom/ApprovementAction';
import { type ApprovementState } from '@/shared/types/Reducers/Custom/ApprovementState';
import { type PaginationAction } from '@/shared/types/Reducers/Custom/PaginationAction';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { type RemotionAction } from '@/shared/types/Reducers/Custom/RemotionAction';
import { type RemotionState } from '@/shared/types/Reducers/Custom/RemotionState';

type Complete = Resolve<
    PaginationState<RegisterRequestIndex> & RemotionState & ApprovementState
>;

export interface RegisterRequestsState extends Complete {
    registerRequest: RegisterRequestIndex | null;
}

export type RegisterRequestsAction =
    | PaginationAction<RegisterRequestIndex>
    | RemotionAction<RegisterRequestIndex>
    | ApprovementAction<RegisterRequestIndex>;
