import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import type { AbilityCreationParams } from '@/shared/types/Parameters/AbilityCreation';
import type { RoleCreationParams } from '@/shared/types/Parameters/RoleCreation';
import type { UserCreationParams } from '@/shared/types/Parameters/UserCreation';
import type { Paths } from '@/shared/types/Urls/Paths';

export class StoreAdapter implements SuperAdminCreator {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    /**
     * Make the headers object used by storagement request
     */
    private makeHeaders(token: string, auth: boolean) {
        const headers = {
            'Content-Type': 'application/json',
            accept: 'application/json',
        };
        if (auth) {
            return { ...headers, Authorization: `Bearer ${token}` };
        }
        return headers;
    }

    /**
     * Make the json output used by storagement request
     */
    private makeBody(data: object, token: string, auth: boolean) {
        if (auth) {
            return JSON.stringify(data);
        }
        return JSON.stringify({ ...data, token });
    }

    /**
     * Request asking an instance's storagement
     */
    private store(
        url: Paths['endpoint']['complete'],
        data: object,
        token: string,
        auth = true
    ) {
        return this.httpClient.request({
            url,
            method: 'post',
            headers: this.makeHeaders(token, auth),
            body: this.makeBody(data, token, auth),
        });
    }

    storeUser(
        url: Paths['endpoint']['creations']['user'],
        data: UserCreationParams,
        token: string
    ): ReturnType<HttpClient['request']> {
        return this.store(url, data, token, url === '/api/users/fast/store');
    }

    storeRole(
        url: Paths['endpoint']['creations']['role'],
        data: RoleCreationParams,
        token: string
    ): ReturnType<HttpClient['request']> {
        return this.store(url, data, token);
    }

    storeAbility(
        url: Paths['endpoint']['creations']['ability'],
        data: AbilityCreationParams,
        token: string
    ): ReturnType<HttpClient['request']> {
        return this.store(url, data, token);
    }

    abortRequest(): void {
        this.httpClient.abortRequest();
    }
}
