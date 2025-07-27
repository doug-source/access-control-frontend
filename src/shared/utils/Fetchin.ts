import { isHandleableError } from '@/shared/utils/isHandleableError';

type InitArg = Parameters<typeof fetch>[1];
type FetchReturn = ReturnType<typeof fetch>;

export const fetchIt = async (path: string, init: InitArg): FetchReturn => {
    const host = import.meta.env.VITE_HOST as string;
    const response = await fetch(host + path, init);
    if (!response.ok && !isHandleableError(response)) {
        throw new Error(`Request failed: ${response.status}`);
    }
    return response;
};
