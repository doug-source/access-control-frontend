import { type RequestStatus } from '@/shared/types/Http/Request';
import { intoRequestStatus } from '@/shared/utils/intoRequestStatus';

export const btnIsDisabled = (
    requestStatus: RequestStatus,
    ...types: RequestStatus['statusCode'][]
) => {
    return intoRequestStatus(requestStatus, ...types);
};
