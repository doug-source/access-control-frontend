import type {
    AbilityFormState,
    ForgotPasswordState,
    LoginState,
    RegisterAccountState,
    RequestAccountState,
    ResetPasswordState,
    RoleFormState,
    State,
    UserFormState,
} from '@/shared/types/States';

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
