import { useLocalLocation } from '@/shared/hooks/useLocalLocation';
import { type LocationStateBetweenScreen } from '@/shared/types/LocationStateBetweenScreen';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type UserIndex } from '@/shared/types/Models/User';
import { type Paths } from '@/shared/types/Urls/Paths';
import { useParams } from 'react-router';

export const useAbilityEndpoints = (): [
    endpointPagination: Paths['endpoint']['abilityPaginations'],
    endpointRemotion: Paths['endpoint']['remotionPrefixes'],
    info?: LocationStateBetweenScreen<UserIndex | RoleIndex>
] => {
    const { pathname, state } = useLocalLocation();
    const params = useParams();

    if (/^\/abilities\/?$/g.test(pathname)) {
        return ['/api/abilities', '/api/abilities'] as const;
    }
    if (pathname.startsWith('/abilities/user')) {
        const info = state as LocationStateBetweenScreen<UserIndex>;
        return [
            `/api/users/${Number(params.id)}/abilities`,
            '/api/abilities',
            info,
        ] as const;
    }
    const info = state as LocationStateBetweenScreen<RoleIndex>;
    return [
        `/api/roles/${Number(params.id)}/abilities`,
        '/api/abilities',
        info,
    ] as const;
};
