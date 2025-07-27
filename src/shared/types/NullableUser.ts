import { type Abilities } from '@/shared/types/Models/Ability';

export interface AuthUser {
    id: string;
    name: string;
    token: string;
    email: string;
    phone: string | null;
    photo: string | null;
    emailVerified: boolean;
}

export interface OutcomeAuthUSer extends AuthUser {
    abilities: Abilities[];
}

export type NullableAuthUser = AuthUser | null;
