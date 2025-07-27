import { type ForgotPasswordHandler } from '@/shared/types/Contracts/Guest/ForgotPasswordHandler';
import { type ResetPasswordHandler } from '@/shared/types/Contracts/Guest/ResetPasswordHandler';
import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type ResetPasswordData } from '@/shared/types/Parameters/ResetPasswordData';
import { type SubmitForgotData } from '@/shared/types/Parameters/SubmitForgotData';

export class PasswordAdapter
    implements ForgotPasswordHandler, ResetPasswordHandler
{
    private httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    reset(data: ResetPasswordData): ReturnType<HttpClient['request']> {
        const body = JSON.stringify(data);
        return this.httpClient.request({
            url: '/api/reset-password',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
            body,
        });
    }

    sayYouForgot(data: SubmitForgotData): ReturnType<HttpClient['request']> {
        return this.httpClient.request({
            url: `/api/forgot-password?email=${data.email}`,
            method: 'get',
            headers: {
                accept: 'application/json',
            },
        });
    }
}
