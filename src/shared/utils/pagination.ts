import type {
    PaginateKey,
    PaginateKeyContext,
    PaginateQueryString,
    PaginateRemainFields,
} from '@/shared/types/Pagination/Keys';
import { groupInitialValue, pageInitialValue } from './defaultValues';

export const getPaginationKey = (
    context: PaginateKeyContext,
    key: PaginateKey,
    id: number
) => {
    return `pagination.${context}.${key}.${id}`;
};

const getLocalStorage = <T>(keyName: string, defaultValue: T) => {
    try {
        const value = localStorage.getItem(keyName);
        if (value) {
            return JSON.parse(value) as T;
        } else {
            localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
        }
    } catch {
        return defaultValue;
    }
};

const getLoaderPaginationFields = (
    searchParams: URLSearchParams,
    context: PaginateKeyContext,
    key: PaginateKey,
    defaultValue: string | number | null,
    id: number
) => {
    const value = searchParams.get(key);
    if (value !== null) {
        const pagKey = getPaginationKey(context, key, id);
        localStorage.removeItem(pagKey);
        return getLocalStorage(pagKey, value);
    }
    return getLocalStorage(getPaginationKey(context, key, id), defaultValue);
};

export const buildLoaderPaginationQuery = (
    searchParams: URLSearchParams,
    context: PaginateKeyContext,
    id: number,
    ...fields: PaginateRemainFields[]
): PaginateQueryString => {
    const queryString = {
        page: String(
            getLoaderPaginationFields(
                searchParams,
                context,
                'page',
                pageInitialValue,
                id
            )
        ),
        group: String(
            getLoaderPaginationFields(
                searchParams,
                context,
                'group',
                groupInitialValue,
                id
            )
        ),
    };
    return fields.reduce((acc, next) => {
        const field = getLoaderPaginationFields(
            searchParams,
            context,
            next,
            null,
            id
        );

        return {
            ...acc,
            ...(field ? { [next]: field } : null),
        };
    }, queryString);
};
