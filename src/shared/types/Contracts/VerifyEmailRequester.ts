import { type HttpClient } from '@/shared/types/Contracts/HttpClient';

interface VerifyData {
    id: string;
    hash: string;
    expires: number;
    signature: string;
}

export interface VerifyEmailRequester {
    /**
     * Request asking to validate the user's mail
     */
    verify(token: string, data: VerifyData): ReturnType<HttpClient['request']>;

    /**
     * Request asking the Verify Email sending
     */
    resend(token: string): ReturnType<HttpClient['request']>;
}
