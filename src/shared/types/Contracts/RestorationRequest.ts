import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Paths } from '@/shared/types/Urls/Paths';

export interface RestorationRequest {
    /**
     * Request asking a resource restoration
     */
    restore(
        token: string,
        url: Paths['endpoint']['restorations'],
        id: number
    ): ReturnType<HttpClient['request']>;
}
