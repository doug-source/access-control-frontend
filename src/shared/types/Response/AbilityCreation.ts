import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';

export type AbilityCreationErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ name: [string] }>;

export type AbilityCreationResponse =
    | HttpSuccessResponse<unknown, HttpStatusCodes['CREATED']>
    | AbilityCreationErrorResponse;
