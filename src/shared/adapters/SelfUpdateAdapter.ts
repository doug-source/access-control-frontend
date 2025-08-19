import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { SelfUpdate } from '@/shared/types/Contracts/SelfUpdater';

export class SelfUpdateAdapter implements SelfUpdate {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    update(token: string, data: FormData): Promise<unknown> {
        return this.httpClient.request({
            url: { url: '/api/users', qs: { _method: 'PATCH' } },
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
            },
            body: data,
        });
    }
}
