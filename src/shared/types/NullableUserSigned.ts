import { type Abilities } from '@/shared/types/Models/Ability';

export interface UserSigned {
    id: string;
    name: string;
    token: string;
    email: string;
    phone: string | null;
    photo: string | null;
    emailVerified: boolean;
    abilities: Abilities[];
}

export type NullableUserSigned = UserSigned | null;
