import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RegisterPermissions } from '.';

describe('<RegisterPermissions /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <RegisterPermissions />
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
    });
});
