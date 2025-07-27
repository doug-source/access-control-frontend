interface SelfUpdateData {
    name: string;
    phone?: string;
}

export interface SelfUpdate {
    /**
     * Execute the user's fields update
     */
    update(
        token: string,
        data: SelfUpdateData,
        photoToUpload: File | null
    ): Promise<unknown>;
}
