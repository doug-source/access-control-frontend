import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PlusLink } from '.';

describe('<PlusLink /> component', () => {
    it('renders showing correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <PlusLink to="/" show={true} />
            </MemoryRouter>
        );
        const $el = screen.getByRole('link');
        expect($el).toBeInTheDocument();
    });
    it('renders hidding correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <PlusLink to="/" show={false} />
            </MemoryRouter>
        );
        const $el = screen.queryByRole('link');
        expect($el).not.toBeInTheDocument();
    });
});
