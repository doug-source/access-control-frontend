import type {
    HttpSuccessResponse,
    SuccessResponseStatusCodes,
} from '@/shared/types/Http/Response';
import type { HttpStatusCodes } from '@/shared/types/Http/Standard';
import type {
    ErrorGroupFields,
    Successes,
} from '@/shared/types/Responsabilities/Outputs';
import type {
    GenericResponse,
    HttpErrorResponse,
} from '@/shared/types/Response/GateDispatcher';
import type { XOR } from '@/shared/types/Xor';

export type Params = {
    Receiver: {
        Login: {
            Output: GenericResponse<
                Successes['Login']['Body'],
                HttpStatusCodes['OK'],
                ErrorGroupFields['Login']['EmailErrorField'],
                ErrorGroupFields['Login']['PasswordErrorField']
            >;
        };
        RequestAccount: {
            Output: GenericResponse<
                unknown,
                HttpStatusCodes['CREATED'],
                ErrorGroupFields['RequestAccount']['EmailErrorField'],
                ErrorGroupFields['RequestAccount']['PhoneErrorField']
            >;
        };
        ForgotPassword: {
            Output: GenericResponse<
                unknown,
                HttpStatusCodes['OK'],
                ErrorGroupFields['ForgotPassword']['EmailErrorField']
            >;
        };
        ResetPassword: {
            Output: GenericResponse<
                Successes['ResetPassword']['Body'],
                HttpStatusCodes['OK'],
                XOR<
                    ErrorGroupFields['ResetPassword']['EmailErrorField'],
                    ErrorGroupFields['ResetPassword']['PasswordErrorField']
                >,
                ErrorGroupFields['ResetPassword']['TokenErrorField']
            >;
        };
        RegisterAccount: {
            Output: GenericResponse<
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
        };
        UserForm: {
            Output: GenericResponse<
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
            Output: GenericResponse<
                unknown,
                HttpStatusCodes['CREATED'],
                ErrorGroupFields['RoleForm']['nameErrorField']
            >;
        };
        AbilityForm: {
            Output: GenericResponse<
                unknown,
                HttpStatusCodes['CREATED'],
                ErrorGroupFields['AbilityForm']['nameErrorField']
            >;
        };
        UserConfig: {
            Output: GenericResponse<
                Successes['UserConfig']['Body'],
                HttpStatusCodes['OK'],
                ErrorGroupFields['UserConfig']['NameErrorField'],
                XOR<
                    ErrorGroupFields['UserConfig']['PhoneErrorField'],
                    ErrorGroupFields['UserConfig']['PhotoErrorField']
                >
            >;
        };
    };
    ErrorHandler: {
        Login: {
            Output: HttpErrorResponse<
                ErrorGroupFields['Login']['EmailErrorField'],
                ErrorGroupFields['Login']['PasswordErrorField']
            >;
        };
        RequestAccount: {
            Output: HttpErrorResponse<
                ErrorGroupFields['RequestAccount']['EmailErrorField'],
                ErrorGroupFields['RequestAccount']['PhoneErrorField']
            >;
        };
        ForgotPassword: {
            Output: HttpErrorResponse<
                ErrorGroupFields['ForgotPassword']['EmailErrorField']
            >;
        };
        ResetPassword: {
            Output: HttpErrorResponse<
                XOR<
                    ErrorGroupFields['ResetPassword']['EmailErrorField'],
                    ErrorGroupFields['ResetPassword']['PasswordErrorField']
                >,
                ErrorGroupFields['ResetPassword']['TokenErrorField']
            >;
        };
        RegisterAccount: {
            Output: HttpErrorResponse<
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
            Output: HttpErrorResponse<
                XOR<
                    ErrorGroupFields['UserForm']['nameErrorField'],
                    ErrorGroupFields['UserForm']['emailErrorField']
                >,
                ErrorGroupFields['UserForm']['passwordErrorField']
            >;
        };
        RoleForm: {
            Output: HttpErrorResponse<
                ErrorGroupFields['RoleForm']['nameErrorField']
            >;
        };
        AbilityForm: {
            Output: HttpErrorResponse<
                ErrorGroupFields['AbilityForm']['nameErrorField']
            >;
        };
        UserConfig: {
            Output: HttpErrorResponse<
                ErrorGroupFields['UserConfig']['NameErrorField'],
                XOR<
                    ErrorGroupFields['UserConfig']['PhoneErrorField'],
                    ErrorGroupFields['UserConfig']['PhotoErrorField']
                >
            >;
        };
    };
    SuccessHandler: {
        Login: {
            Output: HttpSuccessResponse<
                Successes['Login']['Body'],
                SuccessResponseStatusCodes
            >;
        };
        RequestAccount: {
            Output: HttpSuccessResponse<unknown, SuccessResponseStatusCodes>;
        };
        ForgotPassword: {
            Output: HttpSuccessResponse<unknown, SuccessResponseStatusCodes>;
        };
        ResetPassword: {
            Output: HttpSuccessResponse<
                Successes['ResetPassword']['Body'],
                SuccessResponseStatusCodes
            >;
        };
        RegisterAccount: {
            Output: HttpSuccessResponse<unknown, SuccessResponseStatusCodes>;
        };
        UserForm: {
            Output: HttpSuccessResponse<unknown, SuccessResponseStatusCodes>;
        };
        RoleForm: {
            Output: HttpSuccessResponse<unknown, SuccessResponseStatusCodes>;
        };
        AbilityForm: {
            Output: HttpSuccessResponse<unknown, SuccessResponseStatusCodes>;
        };
        UserConfig: {
            Output: HttpSuccessResponse<
                Successes['UserConfig']['Body'],
                SuccessResponseStatusCodes
            >;
        };
        VerifyEmail: {
            Output: HttpSuccessResponse<unknown, SuccessResponseStatusCodes>;
        };
    };
};
