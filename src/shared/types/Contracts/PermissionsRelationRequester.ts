import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Paths } from '@/shared/types/Urls/Paths';

export interface PermissionsRelationRequester {
    /**
     * Execute attachment between instances (user, role or abilities)
     */
    attach(
        token: string,
        url: Paths['endpoint']['attachments'],
        included: string[]
    ): ReturnType<HttpClient['request']>;

    /**
     * Execute detachment between instances (user, role or abilities)
     */
    detach(
        token: string,
        url: Paths['endpoint']['detachments'],
        removed: string[]
    ): ReturnType<HttpClient['request']>;
}
