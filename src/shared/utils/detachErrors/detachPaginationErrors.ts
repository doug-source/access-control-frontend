import { type ResponseErrorData } from '@/shared/types/Http/Error/Response';
import {
    // type ErrorFieldGroupFirst,
    // type ErrorFieldGroupSecond,
    type PaginationErrorResponse,
} from '@/shared/types/Response/Pagination';
import { makeForbiddenErrorMsg } from '@/shared/utils/makeForbiddenErrorMsg';
import { type RefObject } from 'react';

export const detachPaginationErrors = (
    response: PaginationErrorResponse,
    ...inputRefs: (
        | RefObject<HTMLInputElement | null>
        | RefObject<{ name: string; value: string }>
    )[]
): ResponseErrorData | null => {
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
    if (typeof errors.page !== 'undefined') {
        return {
            message: errors.page[0],
            type: 'field',
            field: 'page',
        };
    }
    if (typeof errors.group !== 'undefined') {
        return {
            message: errors.group[0],
            type: 'field',
            field: 'page',
        };
    }
    const inputRef = inputRefs.find((inputRef) => {
        const { current: input } = inputRef;
        return input && typeof errors[input.name] !== 'undefined';
    });
    if (typeof inputRef === 'undefined' || inputRef?.current === null) {
        return null;
    }
    const field = inputRef.current.name;
    return {
        message: errors[field][0],
        type: 'field',
        field,
    };
};
