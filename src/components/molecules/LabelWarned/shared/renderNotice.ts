import { type RequestStatus } from '@/shared/types/Http/Request';

type Output = { show: boolean; msg?: string };

export const renderNotice = (request: RequestStatus, field: string): Output => {
    const fieldRendering =
        request.statusCode === 422 &&
        request.type === 'field' &&
        request.field === field;
    if (fieldRendering) {
        return {
            show: fieldRendering,
            msg: request.message,
        };
    }
    return { show: fieldRendering };
};
