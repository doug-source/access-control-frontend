import { type HttpStatusErrorResponse } from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';

export type VerifyEmailErrorResponse = HttpStatusErrorResponse;

export type VerifyEmailResponse =
    | HttpSuccessResponse<unknown>
    | VerifyEmailErrorResponse;
