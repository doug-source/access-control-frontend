import {
    type HttpStatusCodes,
    type StatusCodeErrorHandleable,
} from '@/shared/types/Http/Standard';
import { type GenericOrField } from '@/shared/types/Utils';
import { type XOR } from '@/shared/types/Xor';

export type ResponseErrorData = {
    message: string;
} & GenericOrField;

export interface HttpStatusErrorResponse {
    statusCode: StatusCodeErrorHandleable;
    body: {
        errors: {
            status: [string];
        };
    };
}

export interface HttpFieldErrorResponse<T, W = T> {
    statusCode: HttpStatusCodes['UNPROCESSABLE_ENTITY'];
    body: {
        errors: W extends T ? T : XOR<T, W>;
    };
}
