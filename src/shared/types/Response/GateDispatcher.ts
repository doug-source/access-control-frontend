import type {
    HttpFieldErrorResponse,
    HttpStatusErrorResponse,
} from '@/shared/types/Http/Error/Response';
import type { HttpSuccessResponse } from '@/shared/types/Http/Response';

export type HttpErrorResponse<F1, F2> =
    | HttpStatusErrorResponse
    | HttpFieldErrorResponse<F1, F2>;

export type GenericResponse<B, C, F1, F2> =
    | HttpSuccessResponse<B, C>
    | HttpErrorResponse<F1, F2>;

export type NoFieldResponse<B, C> =
    | HttpSuccessResponse<B, C>
    | HttpStatusErrorResponse;
