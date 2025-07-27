import { type HttpClient } from '@/shared/types/Contracts/HttpClient';
import { type AbilityCreationParams } from '@/shared/types/Parameters/AbilityCreation';
import { type RoleCreationParams } from '@/shared/types/Parameters/RoleCreation';
import { type UserCreationParams } from '@/shared/types/Parameters/UserCreation';
import { type Paths } from '@/shared/types/Urls/Paths';

export interface SuperAdminCreator {
    /**
     * Request asking an user's storagement
     */
    storeUser(
        url: Paths['endpoint']['creations']['user'],
        data: UserCreationParams,
        token: string
    ): ReturnType<HttpClient['request']>;

    /**
     * Request asking an user's storagement
     */
    storeRole(
        url: Paths['endpoint']['creations']['role'],
        data: RoleCreationParams,
        token: string
    ): ReturnType<HttpClient['request']>;

    /**
     * Request asking an ability's storagement
     */
    storeAbility(
        url: Paths['endpoint']['creations']['ability'],
        data: AbilityCreationParams,
        token: string
    ): ReturnType<HttpClient['request']>;
}
