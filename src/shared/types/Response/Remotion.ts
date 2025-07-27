import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';

export type RemotionErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ id: [string] }>;

export type RemotionResponse =
    | HttpSuccessResponse<unknown>
    | RemotionErrorResponse;
