import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFound } from '.';

describe('<NotFound /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <NotFound />
            </MemoryRouter>
        );
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
