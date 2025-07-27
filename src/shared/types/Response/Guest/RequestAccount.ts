import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';
import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@shared/types/Http/Error/Response';

export type RequestAccountErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ email: [string] }, { phone: [string] }>;

export type RequestAccountResponse =
    | HttpSuccessResponse<unknown, HttpStatusCodes['CREATED']>
    | RequestAccountErrorResponse;
