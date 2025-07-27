import { type HttpStatusCodes } from '@/shared/types/Http/Standard';
import { type GenericOrField } from '@shared/types/Utils';

export interface RequestUnauthorizedError {
    statusCode: HttpStatusCodes['UNAUTHORIZED'];
    message: string;
}

export interface RequestForbiddenError {
    statusCode: HttpStatusCodes['FORBIDDEN'];
    message: string;
}

export type RequestError = {
    statusCode: HttpStatusCodes['UNPROCESSABLE_ENTITY'];
    message: string;
} & GenericOrField;
