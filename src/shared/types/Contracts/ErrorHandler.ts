import type { State } from '@/shared/types/Reducers/Standard/State';
import type { HttpErrorResponse } from '@/shared/types/Response/GateDispatcher';

export interface ErrorHandler<S extends State, F1, F2> {
    /**
     * Handle the response's error data
     */
    handle(output: HttpErrorResponse<F1, F2>, state: S): S;
}
