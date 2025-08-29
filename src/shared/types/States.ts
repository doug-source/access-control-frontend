import type { RequestStatus } from '@/shared/types/Http/Request';
import type { OutcomeAuthUSer } from '@/shared/types/NullableUser';

export interface State {
    requestStatus: RequestStatus;
}

export interface LoginState extends State {
    fields: { email: string; password: string };
    user: OutcomeAuthUSer | null;
}

export interface RequestAccountState extends State {
    fields: { email: string; phone: string };
}

export interface ForgotPasswordState extends State {
    fields: { email: string };
}

export interface RegisterAccountState extends State {
    token: string | null;
    fields: {
        name: string;
        email: string;
        password: string;
        passConfirm: string;
    };
}

export interface ResetPasswordState extends State {
    token: string | null;
    email: string | null;
    fields: {
        password: string;
        passConfirm: string;
    };
}

export interface UserFormState extends State {
    fields: {
        name: string;
        email: string;
        password: string;
    };
}

export interface RoleFormState extends State {
    fields: {
        name: string;
    };
}

export interface AbilityFormState extends State {
    fields: {
        name: string;
    };
}

export interface UserConfigState extends State {
    photoRemote: string | null;
    fields: {
        name: string;
        phone: string;
        email: string;
    };
}

export interface VerifyEmailState extends State {
    verified: boolean;
    resend: boolean;
}
