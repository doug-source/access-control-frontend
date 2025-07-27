import { type HttpClient } from '@/shared/types/Contracts/HttpClient';

type SubmitData = { email: string; password: string };

export interface Authenticator {
    /**
     * Execute the login request
     */
    login(data: SubmitData): ReturnType<HttpClient['request']>;

    /**
     * Execute the logout request
     */
    logout(token: string): ReturnType<HttpClient['request']>;

    /**
     * Execute the provide request
     */
    provide(token: string): ReturnType<HttpClient['request']>;
}
