import { PaginationState } from '@/shared/types/Reducers/Custom/PaginationState';
import { Resolve } from '@/shared/types/Utils';
import { render, screen } from '@testing-library/react';
import { Pagination } from '.';

describe('<Pagination /> component', () => {
    it('renders correctly', () => {
        const onChangeGroup = vi.fn();
        const onChangePage = vi.fn();
        const state: Resolve<
            Pick<PaginationState, 'page' | 'lastPage' | 'group' | 'total'>
        > = { total: 1, page: 1, group: 3, lastPage: 1 };
        render(
            <Pagination
                {...state}
                onChangeGroup={onChangeGroup}
                onChangePage={onChangePage}
                data-testid="pag"
            />
        );
        const $el = screen.getByTestId('pag');
        expect($el).toBeInTheDocument();
    });
});
