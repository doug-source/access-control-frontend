import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import { type RequestAccountErrorResponse } from '@/shared/types/Response/Guest/RequestAccount';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export function detachRegisterRequestError(
    response: RequestAccountErrorResponse
): ResponseErrorData {
    if (response.statusCode !== 422) {
        return makeForbiddenErrorMsg();
    }
    const {
        body: { errors },
    } = response;
    if ('status' in errors) {
        return {
            message: errors.status[0],
            type: 'generic',
        };
    }
    if (typeof errors.email !== 'undefined') {
        return {
            message: errors.email[0],
            type: 'field',
            field: 'email',
        };
    }
    return {
        message: errors.phone[0],
        type: 'field',
        field: 'phone',
    };
}
