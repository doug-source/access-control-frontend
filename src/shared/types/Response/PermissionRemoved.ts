import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';

export type PermissionRemovedErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ removed: [string] }>;

export type PermissionRemovedResponse =
    | HttpSuccessResponse<unknown, HttpStatusCodes['HTTP_NO_CONTENT']>
    | PermissionRemovedErrorResponse;
