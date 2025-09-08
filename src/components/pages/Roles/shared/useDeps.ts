import type { RoleIndex } from '@/shared/types/Models/Role';
import type { User } from '@/shared/types/Models/User';
import type { PaginationLoaderData } from '@/shared/types/Pagination/PaginationLoaderData';
import { pickParamId } from '@/shared/utils/pickParamId';
import { useLoaderData, useLocation, useParams } from 'react-router';

export const useDeps = () => {
    const { pathname } = useLocation();
    const id = pickParamId(useParams());
    const { data = Promise.resolve(null) } =
        useLoaderData() as PaginationLoaderData<RoleIndex, { body: User }>;
    const navigation = `/roles/user/${id}${
        pathname.endsWith('/attach') ? '/attach' : ''
    }` as const;
    const label = navigation.endsWith('/attach')
        ? 'Escolha de novos papéis'
        : 'Propriedade (usuário)';

    return [navigation, data, label] as const;
};
