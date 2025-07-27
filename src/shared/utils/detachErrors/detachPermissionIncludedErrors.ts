import { type PermissionIncludedErrorResponse } from '@/shared/types/Response/PermissionIncluded';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachPermissionIncludedErrors = (
    response: PermissionIncludedErrorResponse
) => {
    if (response.statusCode !== 422) {
        return makeForbiddenErrorMsg();
    }
    const {
        body: { errors },
    } = response;
    if ('status' in errors) {
        return {
            message: errors.status[0],
            type: 'generic' as const,
        };
    }
    return {
        message: errors.included[0],
        type: 'field' as const,
        field: 'included',
    };
};
