import type { AbilityIndex } from '@/shared/types/Models/Ability';
import type { RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import type { RoleIndex } from '@/shared/types/Models/Role';
import type { UserIndex } from '@/shared/types/Models/User';

export interface IdToRemovedAction<T = unknown> {
    type: 'to-remove';
    payload: T;
}

export interface RemotionSuccessAction<T = unknown> {
    type: 'remotion-success';
    payload: T;
}

export type RemotionActionModels =
    | AbilityIndex
    | RegisterRequestIndex
    | RoleIndex
    | UserIndex;

export type RemotionAction<T extends RemotionActionModels> =
    | IdToRemovedAction<T | null>
    | RemotionSuccessAction<T>;
