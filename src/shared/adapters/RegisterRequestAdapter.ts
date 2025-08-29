import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { RegisterRequestMaker } from '@/shared/types/Contracts/RegisterRequestMaker';

export class RegisterRequestAdapter implements RegisterRequestMaker {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    provide(
        data: Parameters<RegisterRequestMaker['provide']>[number]
    ): ReturnType<HttpClient['request']> {
        const body = JSON.stringify(data);
        return this.httpClient.request({
            url: '/api/registers/requests/store',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body,
        });
    }

    abortRequest(): void {
        this.httpClient.abortRequest();
    }
}
