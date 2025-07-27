import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import { type AbilityCreationErrorResponse } from '@/shared/types/Response/AbilityCreation';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachAbilityCreationErrors = (
    response: AbilityCreationErrorResponse
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
