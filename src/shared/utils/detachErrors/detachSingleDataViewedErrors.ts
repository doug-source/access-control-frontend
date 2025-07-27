import { type SingleDataViewedErrorResponse } from '@/shared/types/Response/SingleDataViewed';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachSingleDataViewedErrors = (
    response: SingleDataViewedErrorResponse
) => {
    if (response.statusCode !== 422) {
        return makeForbiddenErrorMsg();
    }
    const {
        body: { errors },
    } = response;
    return {
        message: errors.status[0],
        type: 'generic' as const,
    };
};
