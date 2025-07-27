import type { ResponseErrorData } from '@/shared/types/Http/Error/Response';
import type { UserConfigErrorResponse } from '@/shared/types/Response/UserConfig';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachUserConfigErrors = (
    response: UserConfigErrorResponse
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
    if (typeof errors.phone !== 'undefined') {
        return {
            message: errors.phone[0],
            type: 'field',
            field: 'phone',
        };
    }
    return {
        message: errors.photo[0],
        type: 'generic',
    };
};
