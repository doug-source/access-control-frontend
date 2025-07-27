import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Paths } from '@/shared/types/Urls/Paths';

export interface PaginationRequester {
    /**
     * Request asking the list in pagination format
     */
    paginate(
        token: string,
        url: Paths['endpoint']['paginations'],
        qs?: Record<string, string>
    ): ReturnType<HttpClient['request']>;
}
