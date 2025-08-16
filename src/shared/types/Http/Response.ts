import { type HttpStatusCodes } from '@/shared/types/Http/Standard';

export interface HttpSuccessResponse<T = unknown, S = HttpStatusCodes['OK']> {
    body: T;
    statusCode: S;
    headers?: Headers;
}

export type SuccessResponseStatusCodes =
    | HttpStatusCodes['OK']
    | HttpStatusCodes['HTTP_NO_CONTENT']
    | HttpStatusCodes['CREATED'];
