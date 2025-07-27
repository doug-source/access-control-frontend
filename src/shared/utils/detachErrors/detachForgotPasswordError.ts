import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import { type ForgotPasswordErrorResponse } from '@/shared/types/Response/Guest/ForgotPassword';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export function detachForgotPasswordError(
    response: ForgotPasswordErrorResponse
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
    return {
        message: errors.email[0],
        type: 'field',
        field: 'email',
    };
}
