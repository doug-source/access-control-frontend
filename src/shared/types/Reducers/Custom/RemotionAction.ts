import { AbilityIndex } from '../../Models/Ability';
import { RegisterRequestIndex } from '../../Models/RegisterRequest';
import { RoleIndex } from '../../Models/Role';
import { UserIndex } from '../../Models/User';

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
