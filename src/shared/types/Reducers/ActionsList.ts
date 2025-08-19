import type { AbilitiesAction } from '@/shared/types/Reducers/Abilities';
import type {
    AttachmentAction,
    AttachmentActionModels,
} from '@/shared/types/Reducers/Custom/AttachmentAction';
import type {
    PaginationAction,
    PaginationActionModels,
} from '@/shared/types/Reducers/Custom/PaginationAction';
import type { RegisterRequestsAction } from '@/shared/types/Reducers/RegisterRequests';
import type { RolesAction } from '@/shared/types/Reducers/Roles';
import type {
    SingleDataAction,
    SingleDataActionModels,
} from '@/shared/types/Reducers/SingleData';
import type { Action } from '@/shared/types/Reducers/Standard/Action';
import type { UsersAction } from '@/shared/types/Reducers/Users';
import type { Explosion } from '@/shared/types/Utils';

type CustomActions = [
    Action,
    UsersAction,
    RegisterRequestsAction,
    AbilitiesAction,
    RolesAction,
    PaginationAction<PaginationActionModels>,
    SingleDataAction<SingleDataActionModels>,
    AttachmentAction<AttachmentActionModels>
];

export type ActionDispatchList<T = unknown> = Explosion<CustomActions, T>;
