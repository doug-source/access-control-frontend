import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import { type ResetPasswordErrorResponse } from '@/shared/types/Response/Guest/ResetPassword';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export function detachResetPasswordError(
    response: ResetPasswordErrorResponse
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
    if (typeof errors.password !== 'undefined') {
        return {
            message: errors.password[0],
            type: 'field',
            field: 'password',
        };
    }
    if (typeof errors.email !== 'undefined') {
        return {
            message: errors.email[0],
            type: 'generic',
        };
    }
    return {
        message: errors.token[0],
        type: 'generic',
    };
}
