import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';

export type RoleCreationErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ name: [string] }>;

export type RoleCreationResponse =
    | HttpSuccessResponse<unknown, HttpStatusCodes['CREATED']>
    | RoleCreationErrorResponse;
