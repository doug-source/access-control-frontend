import { type ApprovementErrorResponse } from '@/shared/types/Response/Approvement';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachApprovementErrors = (response: ApprovementErrorResponse) => {
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
