import { type HttpStatusCodes } from '@/shared/types/Http/Standard';

export interface HttpSuccessResponse<T = unknown, S = HttpStatusCodes['OK']> {
    body: T;
    statusCode: S;
    headers?: Headers;
}
