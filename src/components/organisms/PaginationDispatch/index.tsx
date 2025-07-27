import { Pagination } from '@/components/molecules/Pagination';
import { useDispatch } from '@/shared/hooks/useDispatch';
import {
    type ChangeGroupAction,
    type ChangePageAction,
} from '@/shared/types/Reducers/Custom/PaginationAction';
import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { type Resolve } from '@/shared/types/Utils';
import { ComponentPropsWithoutRef } from 'react';

interface PaginationDispatchProps extends ComponentPropsWithoutRef<'div'> {
    state: Resolve<
        Pick<PaginationState, 'page' | 'lastPage' | 'group' | 'total'>
    >;
}

export const PaginationDispatch = ({
    state: { page, lastPage, group, total },
    ...remain
}: PaginationDispatchProps) => {
    const dispatch = useDispatch<ChangePageAction | ChangeGroupAction>();
    return (
        <Pagination
            {...remain}
            page={page}
            lastPage={lastPage}
            group={group}
            total={total}
            onChangePage={(payload) =>
                dispatch({ type: 'change-page', payload })
            }
            onChangeGroup={(payload) =>
                dispatch({ type: 'change-group', payload })
            }
        />
    );
};
