import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';

export type PermissionIncludedErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ included: [string] }>;

export type PermissionIncludedResponse =
    | HttpSuccessResponse<unknown, HttpStatusCodes['HTTP_NO_CONTENT']>
    | PermissionIncludedErrorResponse;
