import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type PermissionsRelationRequester } from '@/shared/types/Contracts/PermissionsRelationRequester';
import { type Paths } from '@/shared/types/Urls/Paths';

export class PermissionsAdapter implements PermissionsRelationRequester {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    detach(
        token: string,
        url: Paths['endpoint']['detachments'],
        removed: string[]
    ): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({ removed, _method: 'PATCH' }),
        });
    }

    attach(
        token: string,
        url: Paths['endpoint']['attachments'],
        included: string[]
    ): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body: JSON.stringify({ included, _method: 'PATCH' }),
        });
    }
}
