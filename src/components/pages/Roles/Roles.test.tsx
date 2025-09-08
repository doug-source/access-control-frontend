import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Roles } from '.';

describe('<Roles /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Roles />
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
