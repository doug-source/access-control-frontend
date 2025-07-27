import { type PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';

export const statePaginationAfterDecrease = <P extends PaginationState>(
    state: P
): P => {
    const total = state.total - 1;
    let { page, lastPage } = state;
    if (page > Math.ceil(total / state.group)) {
        page = Math.max(page - 1, 1);
        lastPage = Math.max(lastPage - 1, 1);
    }
    return { ...state, page, lastPage, total };
};
