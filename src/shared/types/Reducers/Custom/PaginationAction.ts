import { type AbilityIndex } from '@/shared/types/Models/Ability';
import { type RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type UserIndex } from '@/shared/types/Models/User';
import {
    type Action,
    type ActionSuccess,
} from '@/shared/types/Reducers/Standard/Action';

export interface PaginationActionSuccess<T = unknown> {
    type: 'pagination-success';
    payload: {
        data: T[];
        total: number;
        lastPage: number;
    };
}

export interface ChangeFilterAction {
    type: 'change-filter';
}

export interface ChangePageAction {
    type: 'change-page';
    payload: number;
}

export interface ChangeGroupAction {
    type: 'change-group';
    payload: number;
}

export type PaginationActionModels =
    | AbilityIndex
    | RegisterPermissionIndex
    | RegisterRequestIndex
    | RoleIndex
    | UserIndex;

export type PaginationAction<T = unknown> =
    | Exclude<Action, ActionSuccess>
    | PaginationActionSuccess<T>
    | ChangeFilterAction
    | ChangePageAction
    | ChangeGroupAction;
