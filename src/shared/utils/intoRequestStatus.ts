import { type RequestStatus } from '@/shared/types/Http/Request';

export const intoRequestStatus = (
    requestStatus: RequestStatus,
    ...types: RequestStatus['statusCode'][]
) => {
    const { statusCode } = requestStatus;
    return types.some((val) => val === statusCode);
};
