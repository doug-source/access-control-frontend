import type { HttpSuccessResponse } from '@/shared/types/Http/Response';
import type { HttpStatusCodes } from '@/shared/types/Http/Standard';
import type { UserSigned } from '@/shared/types/NullableUserSigned';
import type {
    GenericResponse,
    NoFieldResponse,
} from '@/shared/types/Response/GateDispatcher';
import type { XOR } from '@/shared/types/Xor';

export type Successes = {
    Login: {
        Body: { user: UserSigned };
    };
    ResetPassword: {
        Body: { token: string; email: string };
    };
    UserConfig: {
        Body: { photo?: string };
    };
};

type ErrorFields = {
    email: { email: [string] };
    password: { password: [string] };
    phone: { phone: [string] };
    name: { name: [string] };
    token: { token: [string] };
    photo: { photo: [string] };
};

export type ErrorGroupFields = {
    Login: {
        EmailErrorField: ErrorFields['email'];
        PasswordErrorField: ErrorFields['password'];
    };
    RequestAccount: {
        EmailErrorField: ErrorFields['email'];
        PhoneErrorField: ErrorFields['phone'];
    };
    ForgotPassword: {
        EmailErrorField: ErrorFields['email'];
    };
    ResetPassword: {
        EmailErrorField: ErrorFields['email'];
        PasswordErrorField: ErrorFields['password'];
        TokenErrorField: ErrorFields['token'];
    };
    RegisterAccount: {
        NameErrorField: ErrorFields['name'];
        EmailErrorField: ErrorFields['email'];
        PasswordErrorField: ErrorFields['password'];
        TokenErrorField: ErrorFields['token'];
    };
    UserForm: {
        nameErrorField: ErrorFields['name'];
        emailErrorField: ErrorFields['email'];
        passwordErrorField: ErrorFields['password'];
    };
    RoleForm: {
        nameErrorField: ErrorFields['name'];
    };
    AbilityForm: {
        nameErrorField: ErrorFields['name'];
    };
    UserConfig: {
        NameErrorField: ErrorFields['name'];
        PhoneErrorField: ErrorFields['phone'];
        PhotoErrorField: ErrorFields['photo'];
    };
};

export type Generics = {
    Login: {
        request: GenericResponse<
            Successes['Login']['Body'],
            HttpStatusCodes['OK'],
            ErrorGroupFields['Login']['EmailErrorField'],
            ErrorGroupFields['Login']['PasswordErrorField']
        >;
        provide: NoFieldResponse<
            Successes['Login']['Body'],
            HttpStatusCodes['OK']
        >;
        signOut: HttpSuccessResponse<
            unknown,
            HttpStatusCodes['HTTP_NO_CONTENT']
        >;
    };
    RequestAccount: {
        request: GenericResponse<
            unknown,
            HttpStatusCodes['CREATED'],
            ErrorGroupFields['RequestAccount']['EmailErrorField'],
            ErrorGroupFields['RequestAccount']['PhoneErrorField']
        >;
        provide: NoFieldResponse<unknown, HttpStatusCodes['CREATED']>;
    };
    ForgotPassword: {
        request: GenericResponse<
            unknown,
            HttpStatusCodes['OK'],
            ErrorGroupFields['ForgotPassword']['EmailErrorField']
        >;
    };
    ResetPassword: {
        request: GenericResponse<
            Successes['ResetPassword']['Body'],
            HttpStatusCodes['OK'],
            XOR<
                ErrorGroupFields['ResetPassword']['EmailErrorField'],
                ErrorGroupFields['ResetPassword']['PasswordErrorField']
            >,
            ErrorGroupFields['ResetPassword']['TokenErrorField']
        >;
        provide: NoFieldResponse<
            Successes['ResetPassword']['Body'],
            HttpStatusCodes['OK']
        >;
    };
    RegisterAccount: {
        request: GenericResponse<
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
        provide: NoFieldResponse<string, HttpStatusCodes['CREATED']>;
    };
    UserForm: {
        request: GenericResponse<
            unknown,
            HttpStatusCodes['CREATED'],
            XOR<
                ErrorGroupFields['UserForm']['nameErrorField'],
                ErrorGroupFields['UserForm']['emailErrorField']
            >,
            ErrorGroupFields['UserForm']['passwordErrorField']
        >;
    };
    RoleForm: {
        request: GenericResponse<
            unknown,
            HttpStatusCodes['CREATED'],
            ErrorGroupFields['RoleForm']['nameErrorField']
        >;
    };
    AbilityForm: {
        request: GenericResponse<
            unknown,
            HttpStatusCodes['CREATED'],
            ErrorGroupFields['AbilityForm']['nameErrorField']
        >;
    };
    UserConfig: {
        request: GenericResponse<
            Successes['UserConfig']['Body'],
            HttpStatusCodes['OK'],
            ErrorGroupFields['UserConfig']['NameErrorField'],
            XOR<
                ErrorGroupFields['UserConfig']['PhoneErrorField'],
                ErrorGroupFields['UserConfig']['PhotoErrorField']
            >
        >;
    };
    VerifyEmail: {
        request: NoFieldResponse<unknown, HttpStatusCodes['OK']>;
        provide: NoFieldResponse<unknown, HttpStatusCodes['OK']>;
    };
};
