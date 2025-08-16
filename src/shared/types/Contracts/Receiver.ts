import type { State } from '@/shared/types/Reducers/Standard/State';
import type { GenericResponse } from '@/shared/types/Response/GateDispatcher';

export interface Receiver<S extends State, B, F1, F2 = F1> {
    /**
     * Receive the form's http response
     */
    receive(output: GenericResponse<B, F1, F2>, state: S): S;
}
