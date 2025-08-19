export interface SelfUpdate {
    /**
     * Execute the user's fields update
     */
    update(token: string, data: FormData): Promise<unknown>;
}
