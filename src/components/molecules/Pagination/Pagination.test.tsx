import { render, screen } from '@testing-library/react';
import { Pagination } from '.';

describe('<Pagination /> component', () => {
    it('renders correctly', () => {
        const onChangeGroup = vi.fn();
        const onChangePage = vi.fn();
        render(
            <Pagination
                total={1}
                page={1}
                group={3}
                lastPage={1}
                onChangeGroup={onChangeGroup}
                onChangePage={onChangePage}
                data-testid="pag"
            />
        );
        const $el = screen.getByTestId('pag');
        expect($el).toBeInTheDocument();
    });
});
