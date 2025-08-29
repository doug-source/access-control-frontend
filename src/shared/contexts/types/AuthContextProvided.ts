import type { Abilities } from '@/shared/types/Models/Ability';
import type {
    AuthUser,
    NullableAuthUser,
    OutcomeAuthUSer,
} from '@/shared/types/NullableUser';

export interface AuthContextProvided {
    user: NullableAuthUser;
    abilities: Abilities[];
    login(data: OutcomeAuthUSer): void;
    logout(): void;
    emailValidated(): void;
    updateAuthUser(
        name: AuthUser['name'],
        phone: AuthUser['phone'],
        photo: AuthUser['photo']
    ): void;
}
