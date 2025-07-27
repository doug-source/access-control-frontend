import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';

export type ForgotPasswordErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ email: [string] }>;

export type ForgotPasswordResponse =
    | HttpSuccessResponse<unknown>
    | ForgotPasswordErrorResponse;
