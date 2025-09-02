import { Pagination } from '@/components/molecules/Pagination';
import { useDispatch } from '@/shared/hooks/useDispatch';
import { usePageGroupPagination } from '@/shared/hooks/usePageGroupPagination';
import type {
    ChangeGroupAction,
    ChangePageAction,
} from '@/shared/types/Reducers/Custom/PaginationAction';
import type { PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import type { Resolve } from '@/shared/types/Utils';
import type { PaginateKeyContext } from '@/shared/utils/pagination';
import type { ComponentPropsWithRef } from 'react';

interface PaginationDispatchProps extends ComponentPropsWithRef<'div'> {
    state: Resolve<
        Pick<PaginationState, 'page' | 'lastPage' | 'group' | 'total'>
    >;
    context: PaginateKeyContext;
}

export const PaginationDispatch = ({
    state: { page, lastPage, group, total },
    context,
    ...remain
}: PaginationDispatchProps) => {
    const { setPage, setGroup } = usePageGroupPagination(context);
    const dispatch = useDispatch<ChangePageAction | ChangeGroupAction>();
    return (
        <Pagination
            {...remain}
            page={page}
            lastPage={lastPage}
            group={group}
            total={total}
            onChangePage={(payload) => {
                dispatch({ type: 'change-page', payload });
                setPage(payload);
            }}
            onChangeGroup={(payload) => {
                dispatch({ type: 'change-group', payload });
                setGroup(payload);
            }}
        />
    );
};
