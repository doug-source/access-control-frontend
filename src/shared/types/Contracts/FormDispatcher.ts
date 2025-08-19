export interface FormDispatcher<S = unknown> {
    /**
     * Send the form request
     *
     * @param state The current state
     * @param formData The form's formData
     */
    request(state: S, formData: FormData): Promise<S>;
}
