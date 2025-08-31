import type {
    NullableUserSigned,
    UserSigned,
} from '@/shared/types/NullableUser';

export interface SignState {
    user: NullableUserSigned;
}

export interface SignInAction {
    type: 'SIGN_IN';
    payload: UserSigned;
}

export interface SignOutAction {
    type: 'SIGN_OUT';
}

export interface EmailValidatedAction {
    type: 'EMAIL_VALIDATED';
}

export interface ConfigUpdatingAction {
    type: 'CONFIG_UPDATING';
    payload: {
        name: string;
        phone: string | null;
        photo: string | null;
    };
}

export type SignAction =
    | SignInAction
    | SignOutAction
    | EmailValidatedAction
    | ConfigUpdatingAction;
