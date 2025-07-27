export interface RegisterPermissionIndex {
    id: number;
    email: string;
}

export interface RegisterPermission {
    id: number;
    email: string;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
    expirationData: string;
}
