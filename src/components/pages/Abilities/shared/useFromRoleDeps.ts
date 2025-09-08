import type { AbilityIndex } from '@/shared/types/Models/Ability';
import type { Role } from '@/shared/types/Models/Role';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import { pickParamId } from '@/shared/utils/pickParamId';
import { useLoaderData, useLocation, useParams } from 'react-router';

export const useFromRoleDeps = () => {
    const { pathname } = useLocation();
    const id = pickParamId(useParams());
    const { data = Promise.resolve(null) } =
        useLoaderData() as PaginationLoaderData<AbilityIndex, { body: Role }>;
    const navigation = `/abilities/role/${id}${
        pathname.endsWith('/attach') ? '/attach' : ''
    }` as const;
    const label = navigation.endsWith('/attach')
        ? 'Escolha de novas habilidades'
        : 'Propriedade (papel)';

    return [navigation, data, label] as const;
};
