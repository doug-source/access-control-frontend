import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';
import type { CustomRequestInit } from '@/shared/types/Parameters/CustomRequestInit';

export interface HttpClient extends RequestAborter {
    /**
     * Execute the authentication request
     */
    request(data: CustomRequestInit): Promise<unknown>;
}
