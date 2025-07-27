export interface RegisterRequestIndex {
    id: number;
    email: string;
}

export interface RegisterRequest {
    id: number;
    email: string;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
}
