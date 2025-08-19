import { type HttpClient } from '@/shared/types/Contracts/HttpClient';

type SubmitData = { email: string; phone?: string };

export interface RegisterRequestMaker {
    /**
     * Execute the RegisterRequest provide request
     */
    provide(data: SubmitData): ReturnType<HttpClient['request']>;
}
