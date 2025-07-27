import { type CustomRequestInit } from '@/shared/types/Parameters/CustomRequestInit';

export interface HttpClient {
    /**
     * Execute the authentication request
     */
    request(data: CustomRequestInit): Promise<unknown>;
}
