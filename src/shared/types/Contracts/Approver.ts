import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type Paths } from '@/shared/types/Urls/Paths';

export interface Approver {
    /**
     * Request asking a register approvement
     */
    approve(
        token: string,
        url: Paths['endpoint']['approvements']
    ): ReturnType<HttpClient['request']>;
}
