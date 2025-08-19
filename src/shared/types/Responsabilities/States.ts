import type {
    AbilityFormState,
    ForgotPasswordState,
    LoginState,
    RequestAccountState,
    RoleFormState,
    UserFormState,
} from '@/shared/types/States';
import type {
    RegisterAccountState,
    ResetPasswordState,
    State,
} from '../States';

export type LogicBaseStates =
    | LoginState
    | RequestAccountState
    | ForgotPasswordState
    | RegisterAccountState
    | ResetPasswordState
    | UserFormState
    | RoleFormState
    | AbilityFormState
    | State;
