import type { State } from '@/shared/types/Reducers/Standard/State';

export interface GateDispatcher {
    /**
     * Send the form request
     *
     * @param state The current state
     * @param formData The form's formData
     */
    request(state: State, formData: FormData): Promise<State>;
}
