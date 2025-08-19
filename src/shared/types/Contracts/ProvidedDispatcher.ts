import type { NoFieldResponse } from '@/shared/types/Response/GateDispatcher';

export interface ProvidedDispatcher<B, C, NULLABLE extends boolean = true> {
    /**
     * Request and manage the login provided, if login is provided
     */
    provide(
        searchParams: URLSearchParams
    ): Promise<NoFieldResponse<B, C> | (NULLABLE extends true ? null : never)>;
}
