import type { HttpErrorResponse } from '@/shared/types/Response/GateDispatcher';
import type { State } from '@/shared/types/States';

export interface ErrorHandler<S extends State, F1, F2 = F1> {
    /**
     * Handle the response's error data
     */
    handle(output: HttpErrorResponse<F1, F2>, state: S): S;
}
