export interface PaginationLoaderData<T, K = unknown> {
    pagination: {
        page: number;
        group: number;
    };
    output: Promise<{ data: T[]; lastPage: number; total: number }>;
    data?: Promise<K | null>;
}
