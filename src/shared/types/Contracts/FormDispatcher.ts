import type { RequestAborter } from '@/shared/types/Contracts/RequestAborter';

export interface FormDispatcher<S = unknown> extends RequestAborter {
    /**
     * Send the form request
     *
     * @param state The current state
     * @param formData The form's formData
     */
    request(state: S, formData: FormData): Promise<S>;
}
