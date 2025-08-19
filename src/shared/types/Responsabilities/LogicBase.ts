import type { ErrorHandler } from '@/shared/types/Contracts/ErrorHandler';
import type { FormDispatcher } from '@/shared/types/Contracts/FormDispatcher';
import type { SignOutDispatcher } from '@/shared/types/Contracts/LogoutDispatcher';
import type { NoFieldErrorHandler } from '@/shared/types/Contracts/NoFieldErrorHandler';
import type { NoFieldReceiver } from '@/shared/types/Contracts/NoFieldReceiver';
import type { ProvidedDispatcher } from '@/shared/types/Contracts/ProvidedDispatcher';
import type { Receiver } from '@/shared/types/Contracts/Receiver';
import type { SuccessHandler } from '@/shared/types/Contracts/SuccessHandler';
import type { HttpStatusCodes } from '@/shared/types/Http/Standard';
import type {
    ErrorGroupFields,
    Successes,
} from '@/shared/types/Responsabilities/Outputs';
import type {
    AbilityFormState,
    ForgotPasswordState,
    LoginState,
    RegisterAccountState,
    RequestAccountState,
    ResetPasswordState,
    RoleFormState,
    UserConfigState,
    UserFormState,
    VerifyEmailState,
} from '@/shared/types/States';
import type { Explosion } from '@/shared/types/Utils';
import type { XOR } from '@/shared/types/Xor';

export type Reference = {
    Dispatcher: {
        Login: {
            base: FormDispatcher<LoginState>;
            provide: ProvidedDispatcher<
                Successes['Login']['Body'],
                HttpStatusCodes['OK']
            >;
            signOut: SignOutDispatcher;
        };
        RequestAccount: {
            base: FormDispatcher<RequestAccountState>;
            provide: ProvidedDispatcher<unknown, HttpStatusCodes['CREATED']>;
        };
        ForgotPassword: {
            base: FormDispatcher<ForgotPasswordState>;
        };
        ResetPassword: {
            base: FormDispatcher<ResetPasswordState>;
            provide: ProvidedDispatcher<
                Successes['ResetPassword']['Body'],
                HttpStatusCodes['OK'],
                false
            >;
        };
        RegisterAccount: {
            base: FormDispatcher<RegisterAccountState>;
            provide: ProvidedDispatcher<string, HttpStatusCodes['CREATED']>;
        };
        UserForm: {
            base: FormDispatcher<UserFormState>;
        };
        RoleForm: {
            base: FormDispatcher<RoleFormState>;
        };
        AbilityForm: {
            base: FormDispatcher<AbilityFormState>;
        };
        UserConfig: {
            base: FormDispatcher<UserConfigState>;
        };
        VerifyEmail: {
            base: FormDispatcher<VerifyEmailState>;
            provide: ProvidedDispatcher<unknown, HttpStatusCodes['OK']>;
        };
    };
    Receiver: {
        Login: Receiver<
            LoginState,
            Successes['Login']['Body'],
            HttpStatusCodes['OK'],
            ErrorGroupFields['Login']['EmailErrorField'],
            ErrorGroupFields['Login']['PasswordErrorField']
        >;
        RequestAccount: Receiver<
            RequestAccountState,
            unknown,
            HttpStatusCodes['CREATED'],
            ErrorGroupFields['RequestAccount']['EmailErrorField'],
            ErrorGroupFields['RequestAccount']['PhoneErrorField']
        >;
        ForgotPassword: Receiver<
            ForgotPasswordState,
            unknown,
            HttpStatusCodes['OK'],
            ErrorGroupFields['ForgotPassword']['EmailErrorField']
        >;
        ResetPassword: Receiver<
            ResetPasswordState,
            Successes['ResetPassword']['Body'],
            HttpStatusCodes['OK'],
            XOR<
                ErrorGroupFields['ResetPassword']['EmailErrorField'],
                ErrorGroupFields['ResetPassword']['PasswordErrorField']
            >,
            ErrorGroupFields['ResetPassword']['TokenErrorField']
        >;
        RegisterAccount: Receiver<
            RegisterAccountState,
            unknown,
            HttpStatusCodes['CREATED'],
            XOR<
                ErrorGroupFields['RegisterAccount']['NameErrorField'],
                ErrorGroupFields['RegisterAccount']['EmailErrorField']
            >,
            XOR<
                ErrorGroupFields['RegisterAccount']['PasswordErrorField'],
                ErrorGroupFields['RegisterAccount']['TokenErrorField']
            >
        >;
        UserForm: Receiver<
            UserFormState,
            unknown,
            HttpStatusCodes['CREATED'],
            XOR<
                ErrorGroupFields['UserForm']['nameErrorField'],
                ErrorGroupFields['UserForm']['emailErrorField']
            >,
            ErrorGroupFields['UserForm']['passwordErrorField']
        >;
        RoleForm: Receiver<
            RoleFormState,
            unknown,
            HttpStatusCodes['CREATED'],
            ErrorGroupFields['RoleForm']['nameErrorField']
        >;
        AbilityForm: Receiver<
            AbilityFormState,
            unknown,
            HttpStatusCodes['CREATED'],
            ErrorGroupFields['AbilityForm']['nameErrorField']
        >;
        UserConfig: Receiver<
            UserConfigState,
            Successes['UserConfig']['Body'],
            HttpStatusCodes['OK'],
            ErrorGroupFields['UserConfig']['NameErrorField'],
            XOR<
                ErrorGroupFields['UserConfig']['PhoneErrorField'],
                ErrorGroupFields['UserConfig']['PhotoErrorField']
            >
        >;
        VerifyEmail: NoFieldReceiver<
            VerifyEmailState,
            unknown,
            HttpStatusCodes['OK']
        >;
    };
    Handlers: {
        Login: {
            Success: SuccessHandler<Successes['Login']['Body'], LoginState>;
            Error: ErrorHandler<
                LoginState,
                ErrorGroupFields['Login']['EmailErrorField'],
                ErrorGroupFields['Login']['PasswordErrorField']
            >;
        };
        RequestAccount: {
            Success: SuccessHandler<unknown, RequestAccountState>;
            Error: ErrorHandler<
                RequestAccountState,
                ErrorGroupFields['RequestAccount']['EmailErrorField'],
                ErrorGroupFields['RequestAccount']['PhoneErrorField']
            >;
        };
        ForgotPassword: {
            Success: SuccessHandler<unknown, ForgotPasswordState>;
            Error: ErrorHandler<
                ForgotPasswordState,
                ErrorGroupFields['ForgotPassword']['EmailErrorField']
            >;
        };
        ResetPassword: {
            Success: SuccessHandler<
                Successes['ResetPassword']['Body'],
                ResetPasswordState
            >;
            Error: ErrorHandler<
                ResetPasswordState,
                XOR<
                    ErrorGroupFields['ResetPassword']['EmailErrorField'],
                    ErrorGroupFields['ResetPassword']['PasswordErrorField']
                >,
                ErrorGroupFields['ResetPassword']['TokenErrorField']
            >;
        };
        RegisterAccount: {
            Success: SuccessHandler<unknown, RegisterAccountState>;
            Error: ErrorHandler<
                RegisterAccountState,
                XOR<
                    ErrorGroupFields['RegisterAccount']['NameErrorField'],
                    ErrorGroupFields['RegisterAccount']['EmailErrorField']
                >,
                XOR<
                    ErrorGroupFields['RegisterAccount']['PasswordErrorField'],
                    ErrorGroupFields['RegisterAccount']['TokenErrorField']
                >
            >;
        };
        UserForm: {
            Success: SuccessHandler<unknown, UserFormState>;
            Error: ErrorHandler<
                UserFormState,
                XOR<
                    ErrorGroupFields['UserForm']['nameErrorField'],
                    ErrorGroupFields['UserForm']['emailErrorField']
                >,
                ErrorGroupFields['UserForm']['passwordErrorField']
            >;
        };
        RoleForm: {
            Success: SuccessHandler<unknown, RoleFormState>;
            Error: ErrorHandler<
                RoleFormState,
                ErrorGroupFields['RoleForm']['nameErrorField']
            >;
        };
        AbilityForm: {
            Success: SuccessHandler<unknown, AbilityFormState>;
            Error: ErrorHandler<
                AbilityFormState,
                ErrorGroupFields['AbilityForm']['nameErrorField']
            >;
        };
        UserConfig: {
            Success: SuccessHandler<
                Successes['UserConfig']['Body'],
                UserConfigState
            >;
            Error: ErrorHandler<
                UserConfigState,
                ErrorGroupFields['UserConfig']['NameErrorField'],
                XOR<
                    ErrorGroupFields['UserConfig']['PhoneErrorField'],
                    ErrorGroupFields['UserConfig']['PhotoErrorField']
                >
            >;
        };
        VerifyEmail: {
            Success: SuccessHandler<unknown, VerifyEmailState>;
            Error: NoFieldErrorHandler<VerifyEmailState>;
        };
    };
};

type ErrorHandlerList = [
    Reference['Handlers']['Login']['Error'],
    Reference['Handlers']['RequestAccount']['Error'],
    Reference['Handlers']['ForgotPassword']['Error'],
    Reference['Handlers']['ResetPassword']['Error'],
    Reference['Handlers']['RegisterAccount']['Error'],
    Reference['Handlers']['UserForm']['Error'],
    Reference['Handlers']['RoleForm']['Error'],
    Reference['Handlers']['AbilityForm']['Error'],
    Reference['Handlers']['UserConfig']['Error'],
    Reference['Handlers']['VerifyEmail']['Error']
];

export type DeclareErrorHandler<T = unknown> = Explosion<ErrorHandlerList, T>;

export type LogicBase<E, S> = {
    errorHandler: DeclareErrorHandler<E>;
    dispatcher: FormDispatcher<S>;
};
