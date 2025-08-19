import * as AuthHooks from '@/shared/hooks/useAuth';
import * as authenticatorHooks from '@/shared/hooks/useUnauthenticator';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { type Abilities } from '@/shared/types/Models/Ability';
import type {
    AuthUser,
    NullableAuthUser,
    OutcomeAuthUSer,
} from '@/shared/types/NullableUser';
import { faker } from '@faker-js/faker';
import { act, renderHook } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useLogoutHandler } from './useLogoutHandler';

let authenticatorSpy: MockInstance<
    () => {
        signOut(token: string): Promise<unknown>;
    }
>;
let authSpy: MockInstance<
    () => {
        user: NullableAuthUser;
        abilities: Abilities[];
        login(data: OutcomeAuthUSer): Promise<void>;
        logout(): void;
        emailValidated(): void;
        updateAuthUser(
            name: AuthUser['name'],
            phone: AuthUser['phone'],
            photo: AuthUser['photo']
        ): void;
    }
>;

type Children = {
    children: ReactNode;
};

describe('useLogoutHandler hook', () => {
    beforeAll(() => {
        authenticatorSpy = vi.spyOn(authenticatorHooks, 'useUnauthenticator');
        authSpy = vi.spyOn(AuthHooks, 'useAuth');
    });
    afterAll(() => {
        authenticatorSpy.mockRestore();
    });
    beforeEach(() => {
        localStorage.clear();
    });
    it('runs correctly', async () => {
        authenticatorSpy.mockReturnValue({
            signOut(token) {
                return Promise.resolve(token);
            },
        });
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: true,
                name: faker.person.firstName(),
                token: faker.word.noun(),
                abilities: [],
            })
        );

        const wrapper = ({ children }: Children) => {
            return createElement(RouterProvider, {
                router: createMemoryRouter([
                    {
                        path: '/',
                        element: createElement(AuthProvider, {
                            children,
                        }),
                    },
                ]),
            });
        };
        const fnLoading = vi.fn();
        const initialProps: { onLoading: (loading: boolean) => void } = {
            onLoading: (loading) => fnLoading(loading),
        };
        const { result } = renderHook(
            ({ onLoading }) => {
                return useLogoutHandler(onLoading);
            },
            { wrapper, initialProps }
        );
        await act(() => {
            return result.current();
        });

        expect(fnLoading).toHaveBeenCalled();
    });
    it('runs no token correctly', async () => {
        authenticatorSpy.mockReturnValue({
            signOut(token) {
                return Promise.resolve(token);
            },
        });
        const auth = {
            user: {
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: true,
                name: faker.person.firstName(),
                token: '',
                phone: null,
                photo: null,
            },
            abilities: [],
            emailValidated: vi.fn(),
            login: vi.fn(),
            logout: vi.fn(),
            updateAuthUser: vi.fn(),
        };
        authSpy.mockReturnValue(auth);
        const wrapper = ({ children }: Children) => {
            return createElement(RouterProvider, {
                router: createMemoryRouter([
                    {
                        path: '/',
                        element: createElement(AuthProvider, {
                            children,
                        }),
                    },
                ]),
            });
        };
        const fnLoading = vi.fn();
        const initialProps: { onLoading: (loading: boolean) => void } = {
            onLoading: (loading) => fnLoading(loading),
        };
        const { result } = renderHook(
            ({ onLoading }) => {
                return useLogoutHandler(onLoading);
            },
            { wrapper, initialProps }
        );
        await act(() => result.current());
        expect(auth.logout).toHaveBeenCalled();
    });
});
