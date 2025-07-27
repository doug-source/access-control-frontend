import {
    type HttpFieldErrorResponse,
    type HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type Pagination } from '@/shared/types/Models/Pagination';

export type PaginationErrorResponse =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<{ page: [string] }, { group: [string] }>;

export type PaginationResponse<T> =
    | HttpSuccessResponse<Pagination<T>>
    | PaginationErrorResponse;
