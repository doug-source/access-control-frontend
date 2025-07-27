import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import { type FastUserCreationErrorResponse } from '@/shared/types/Response/FastUserCreation';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachFastUserErrors = (
    response: FastUserCreationErrorResponse
): ResponseErrorData => {
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
    if (typeof errors.name !== 'undefined') {
        return {
            message: errors.name[0],
            type: 'field',
            field: 'name',
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
        message: errors.password[0],
        type: 'field',
        field: 'password',
    };
};
