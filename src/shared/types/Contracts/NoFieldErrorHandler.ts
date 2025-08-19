import type { HttpStatusErrorResponse } from '@/shared/types/Http/Error/Response';
import type { State } from '@/shared/types/States';

export interface NoFieldErrorHandler<S extends State> {
    /**
     * Handle the response's error data
     */
    handle(output: HttpStatusErrorResponse, state: S): S;
}
