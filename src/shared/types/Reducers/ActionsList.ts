import { type AbilitiesAction } from '@/shared/types/Reducers/Abilities';
import {
    type AttachmentAction,
    type AttachmentActionModels,
} from '@/shared/types/Reducers/Custom/AttachmentAction';
import {
    type PaginationAction,
    type PaginationActionModels,
} from '@/shared/types/Reducers/Custom/PaginationAction';
import { type ResetPasswordAction } from '@/shared/types/Reducers/Guest/ChangePassword';
import { type RegisterRequestsAction } from '@/shared/types/Reducers/RegisterRequests';
import { type RolesAction } from '@/shared/types/Reducers/Roles';
import {
    type SingleDataAction,
    type SingleDataActionModels,
} from '@/shared/types/Reducers/SingleData';
import { type Action } from '@/shared/types/Reducers/Standard/Action';
import type { UserConfigAction } from '@/shared/types/Reducers/UserConfig';
import { type UsersAction } from '@/shared/types/Reducers/Users';
import { type AD } from '@/shared/types/Utils';

type list = unknown[];
type Explosion<T extends list, W> = list extends T
    ? list
    : T extends [infer First, ...infer Remain]
    ? [W] extends [First]
        ? AD<W>
        : Explosion<Remain, W>
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any;

type CustomActions = [
    UsersAction,
    PaginationAction<PaginationActionModels>,
    SingleDataAction<SingleDataActionModels>,
    AttachmentAction<AttachmentActionModels>,
    RegisterRequestsAction,
    Action,
    ResetPasswordAction,
    AbilitiesAction,
    RolesAction,
    UserConfigAction
];

export type ActionDispatchList<T = unknown> = Explosion<CustomActions, T>;
