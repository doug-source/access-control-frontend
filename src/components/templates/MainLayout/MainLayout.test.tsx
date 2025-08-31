import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MainLayout } from '.';

describe('<MainLayout /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <MainLayout />
            </MemoryRouter>
        );
        const $el = screen.getByRole('banner');
        expect($el).toBeInTheDocument();
    });
    it('renders with user menu item visible correctly', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <MainLayout />
            </MemoryRouter>
        );
        const $el = screen.getByRole('link', { name: 'Usuários' });
        expect($el).toBeInTheDocument();
    });
});
