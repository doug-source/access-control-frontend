import {
    type Action,
    type ActionSuccess,
} from '@/shared/types/Reducers/Standard/Action';
import { Ability } from '../Models/Ability';
import { RegisterPermission } from '../Models/RegisterPermission';
import { RegisterRequest } from '../Models/RegisterRequest';
import { Role } from '../Models/Role';
import { User } from '../Models/User';

interface SingleDataActionSuccess<T> {
    type: 'success';
    payload: T;
}

export type SingleDataActionModels =
    | Ability
    | RegisterPermission
    | RegisterRequest
    | Role
    | User;

export type SingleDataAction<T extends SingleDataActionModels> =
    | Exclude<Action, ActionSuccess>
    | SingleDataActionSuccess<T>;
