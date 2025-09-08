import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RegisterRequests } from '.';

describe('<RegisterRequests /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <RegisterRequests />
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
