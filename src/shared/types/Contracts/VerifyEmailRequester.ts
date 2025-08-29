import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';

interface VerifyData {
    id: string;
    hash: string;
    expires: number;
    signature: string;
}

export interface VerifyEmailRequester extends RequestAborter {
    /**
     * Request asking to validate the user's mail
     */
    verify(token: string, data: VerifyData): ReturnType<HttpClient['request']>;

    /**
     * Request asking the Verify Email sending
     */
    resend(token: string): ReturnType<HttpClient['request']>;
}
