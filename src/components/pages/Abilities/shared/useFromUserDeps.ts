import type { AbilityIndex } from '@/shared/types/Models/Ability';
import type { User } from '@/shared/types/Models/User';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import { pickParamId } from '@/shared/utils/pickParamId';
import { useLoaderData, useLocation, useParams } from 'react-router';

export const useFromUserDeps = () => {
    const { pathname } = useLocation();
    const id = pickParamId(useParams());
    const { data = Promise.resolve(null) } =
        useLoaderData() as PaginationLoaderData<AbilityIndex, { body: User }>;
    const navigation = `/abilities/user/${id}${
        pathname.endsWith('/attach') ? '/attach' : ''
    }` as const;
    const label = navigation.endsWith('/attach')
        ? 'Escolha de novas habilidades'
        : 'Propriedade (usuário)';

    return [navigation, data, label] as const;
};
