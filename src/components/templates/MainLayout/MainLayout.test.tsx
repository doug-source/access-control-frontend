import type { AuthContextProvided } from '@/shared/contexts/types/AuthContextProvided';
import * as AuthHooks from '@/shared/hooks/useAuth';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { MockInstance } from 'vitest';
import { MainLayout } from '.';

let authSpy: MockInstance<() => AuthContextProvided>;

describe('<MainLayout /> component', () => {
    beforeAll(() => {
        authSpy = vi.spyOn(AuthHooks, 'useAuth');
    });
    afterAll(() => {
        authSpy.mockRestore();
    });
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <MainLayout />
                </AuthProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('banner');
        expect($el).toBeInTheDocument();
    });
    it('renders with user menu item visible correctly', () => {
        authSpy.mockReturnValue({
            user: {
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: true,
                name: faker.person.firstName(),
                token: faker.word.noun(),
                phone: null,
                photo: null,
            },
            abilities: ['user-screen'],
            emailValidated: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
            updateAuthUser: vi.fn(),
        });
        render(
            <MemoryRouter initialEntries={['/home']}>
                <AuthProvider>
                    <MainLayout />
                </AuthProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('link', { name: 'Usuários' });
        expect($el).toBeInTheDocument();
    });
});
