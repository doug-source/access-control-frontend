import { type HttpSuccessResponse } from '@/shared/types/Http/Response';
import { type HttpStatusErrorResponse } from '@shared/types/Http/Error/Response';

export type SingleDataViewedErrorResponse = HttpStatusErrorResponse;

export type SingleDataViewedResponse<T> =
    | HttpSuccessResponse<T>
    | SingleDataViewedErrorResponse;
