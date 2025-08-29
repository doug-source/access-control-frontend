import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';

export interface SelfUpdate extends RequestAborter {
    /**
     * Execute the user's fields update
     */
    update(token: string, data: FormData): Promise<unknown>;
}
