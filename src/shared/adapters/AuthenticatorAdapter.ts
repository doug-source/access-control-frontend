import { type Authenticator } from '@/shared/types/Contracts/Authenticator';
import { type HttpClient } from '@/shared/types/Contracts/HttpClient';

export class AuthenticatorAdapter implements Authenticator {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    login(
        data: Parameters<Authenticator['login']>[0]
    ): ReturnType<HttpClient['request']> {
        const body = JSON.stringify(data);
        return this.httpClient.request({
            url: '/api/login',
            method: 'post',
            body,
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        });
    }

    logout(token: string): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url: '/api/logout',
            method: 'post',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    provide(token: string): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url: '/api/login/provide',
            method: 'post',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    abortRequest(): void {
        this.httpClient.abortRequest();
    }
}
