import type { HttpClient } from '@/shared/types/Contracts/HttpClient';
import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';

type SubmitData = { email: string; phone?: string };

export interface RegisterRequestMaker extends RequestAborter {
    /**
     * Execute the RegisterRequest provide request
     */
    provide(data: SubmitData): ReturnType<HttpClient['request']>;
}
