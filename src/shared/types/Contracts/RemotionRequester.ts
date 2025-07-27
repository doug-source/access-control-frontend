import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Paths } from '@/shared/types/Urls/Paths';

export interface RemotionRequester {
    /**
     * Request asking a resource remotion
     */
    remove(
        token: string,
        url: Paths['endpoint']['remotions']
    ): ReturnType<HttpClient['request']>;
}
