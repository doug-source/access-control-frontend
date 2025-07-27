import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';

export const makeForbiddenErrorMsg = (
    customMsg?: string
): ResponseErrorData => {
    const message = customMsg ?? (import.meta.env.VITE_FORBIDDEN_MSG as string);
    return {
        type: 'generic',
        message,
    };
};
