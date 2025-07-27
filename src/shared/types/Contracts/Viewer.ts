import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Paths } from '@/shared/types/Urls/Paths';

export interface Viewer {
    /**
     * Execute the request to get a resource
     */
    show(
        url: Paths['endpoint']['viewers'],
        token: string
    ): ReturnType<HttpClient['request']>;
}