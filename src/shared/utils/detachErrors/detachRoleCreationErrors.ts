import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import { RoleCreationErrorResponse } from '@/shared/types/Response/RoleCreation';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachRoleCreationErrors = (
    response: RoleCreationErrorResponse
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
    return {
        message: errors.name[0],
        type: 'field',
        field: 'name',
    };
};
