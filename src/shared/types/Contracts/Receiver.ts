import type { GenericResponse } from '@/shared/types/Response/GateDispatcher';
import type { State } from '../States';

export interface Receiver<S extends State, B, C, F1, F2 = F1> {
    /**
     * Receive the form's http response
     */
    receive(output: GenericResponse<B, C, F1, F2>, state: S): S;
}
