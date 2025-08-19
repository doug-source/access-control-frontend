import type { NoFieldResponse } from '@/shared/types/Response/GateDispatcher';
import type { State } from '@/shared/types/States';

export interface NoFieldReceiver<S extends State, B, C> {
    /**
     * Receive the form's http response
     */
    receive(output: NoFieldResponse<B, C>, state: S): S;
}
