import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { Paths } from '@/shared/types/Urls/Paths';
import type { RequestAborter } from './RequestAborter';

export interface PaginationRequester extends RequestAborter {
    /**
     * Request asking the list in pagination format
     */
    paginate(args: {
        token: string;
        url: Paths['endpoint']['paginations'];
        qs?: Record<string, string>;
        signal?: AbortSignal;
    }): ReturnType<HttpClient['request']>;
}
