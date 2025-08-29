import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';
import type { Paths } from '@/shared/types/Urls/Paths';

export interface Viewer extends RequestAborter {
    /**
     * Execute the request to get a resource
     */
    show(
        url: Paths['endpoint']['viewers'],
        token: string
    ): ReturnType<HttpClient['request']>;
}
