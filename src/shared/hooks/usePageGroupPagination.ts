import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { useSignState } from '@/shared/hooks/useSignState';
import {
    getPaginationKey,
    groups,
    type PaginateKeyContext,
} from '@/shared/utils/pagination';

export const usePageGroupPagination = (context: PaginateKeyContext) => {
    const id = Number(useSignState().user?.id ?? 0);
    const [page, setPage] = useLocalStorage(
        getPaginationKey(context, 'page', id),
        1
    );
    const [group, setGroup] = useLocalStorage(
        getPaginationKey(context, 'group', id),
        groups[0]
    );
    return { page, setPage, group, setGroup };
};
