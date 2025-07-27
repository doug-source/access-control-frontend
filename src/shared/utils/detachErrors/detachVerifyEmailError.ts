import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import { type VerifyEmailErrorResponse } from '@/shared/types/Response/VerifyEmail';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';

export function detachVerifyEmailError(
    response: VerifyEmailErrorResponse,
    customMsg?: string
): ResponseErrorData {
    if (response.statusCode !== 422) {
        return makeForbiddenErrorMsg(customMsg);
    }
    const {
        body: { errors },
    } = response;
    return {
        message: customMsg ?? errors.status[0],
        type: 'generic',
    };
}
