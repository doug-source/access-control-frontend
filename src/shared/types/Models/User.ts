export interface UserIndex {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    photo: string | null;
    emailVerifiedAt: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
