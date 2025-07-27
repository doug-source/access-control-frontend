import {
    type RequestError,
    type RequestForbiddenError,
    type RequestUnauthorizedError,
} from '@/shared/types/Http/Error/Request';
import { type HttpStatusCodes } from '@/shared/types/Http/Standard';

interface RequestCustomStatusCodes {
    IDLE: -1;
    PENDING: 0;
}

type RequestStatusCodesJoin = RequestCustomStatusCodes & HttpStatusCodes;

export type RequestAppStatusCodes = {
    [K in keyof RequestStatusCodesJoin]: RequestStatusCodesJoin[K];
};

interface RequestIdle {
    statusCode: RequestStatusCodesJoin['IDLE'];
}

interface RequestPending {
    statusCode: RequestStatusCodesJoin['PENDING'];
}

interface RequestSuccess {
    statusCode: RequestStatusCodesJoin['OK'];
    message: string;
}

export type RequestStatus =
    | RequestIdle
    | RequestPending
    | RequestSuccess
    | RequestError
    | RequestUnauthorizedError
    | RequestForbiddenError;
