import type { OutcomeAuthUSer } from '@/shared/types/NullableUser';
import type { NoFieldResponse } from '@/shared/types/Response/GateDispatcher';

export interface LoginProvidedDispatcher {
    /**
     * Request and manage the login provided, if login is provided
     */
    provide(
        searchParams: URLSearchParams
    ): Promise<NoFieldResponse<{ user: OutcomeAuthUSer }> | null>;
}
