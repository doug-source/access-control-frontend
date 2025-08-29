export interface RequestAborter {
    /**
     * Abort the last request
     */
    abortRequest(): void;
}
