import { type RemotionErrorResponse } from '@/shared/types/Response/Remotion';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export const detachRemotionErrors = (response: RemotionErrorResponse) => {
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
        message: errors.id[0],
        type: 'field' as const,
        field: 'id',
    };
};
