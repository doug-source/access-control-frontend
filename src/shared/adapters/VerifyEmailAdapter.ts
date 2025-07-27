import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type VerifyEmailRequester } from '@/shared/types/Contracts/VerifyEmailRequester';

export class VerifyEmailAdapter implements VerifyEmailRequester {
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    verify(
        token: string,
        data: Parameters<VerifyEmailRequester['verify']>[1]
    ): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url: `/api/email/verify/${data.id}/${data.hash}?expires=${data.expires}&signature=${data.signature}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }

    resend(token: string): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url: '/api/email/verification-notification',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
