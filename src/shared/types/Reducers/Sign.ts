import type {
    NullableUserSigned,
    UserSigned,
} from '@/shared/types/NullableUserSigned';

export interface SignState {
    user: NullableUserSigned;
    confirmations: {
        remotions: {
            user: boolean;
            registerRequest: boolean;
            role: boolean;
            ability: boolean;
        };
        restorations: {
            user: boolean;
        };
        approvements: {
            registerRequest: boolean;
        };
        detachment: {
            role: boolean;
            ability: boolean;
        };
        attachment: {
            role: boolean;
            ability: boolean;
        };
    };
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
    type: 'CONFIG_USER_UPDATING';
    payload: {
        name: string;
        phone: string | null;
        photo: string | null;
    };
}

type ConfirmationKeys = keyof SignState['confirmations'];

export interface ConfirmationChangeAction {
    type: 'CONFIG_CONFIRMATION_UPDATING';
    payload: {
        [K in ConfirmationKeys]?: {
            [W in keyof SignState['confirmations'][K]]?: boolean;
        };
    };
}

export type SignAction =
    | SignInAction
    | SignOutAction
    | EmailValidatedAction
    | ConfigUpdatingAction
    | ConfirmationChangeAction;
