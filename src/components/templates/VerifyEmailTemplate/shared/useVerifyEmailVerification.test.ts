import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { VerifyEmailRequesterProvider } from '@/shared/providers/VerifyEmailRequesterProvider';
import { VerifyEmailRequester } from '@/shared/types/Contracts/VerifyEmailRequester';
import { AuthUser } from '@/shared/types/NullableUser';
import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useVerifyEmailVerification } from './useVerifyEmailVerification';

type ResendParams = Parameters<VerifyEmailRequester['verify']>;

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

describe('useVerifyEmailVerification hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    afterEach(() => {
        localNavigateSpy.mockReset();
        localStorage.clear();
    });
    it('runs when request returns status code equals 200 correctly', async () => {
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: false,
                name: faker.person.firstName(),
                token: faker.word.noun(),
                abilities: [],
            })
        );
        const emailVerifyLoaderReturn = {
            expires: faker.number.int({ min: 1 }),
            signature: faker.word.noun(),
        };
        const emailRedirect = {
            id: faker.number.int({ min: 1 }).toString(),
            hash: faker.word.noun(),
        };
        const requester = new (class implements VerifyEmailRequester {
            verify(token: string, data: ResendParams[1]): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [data.id, token];
                }
                return Promise.resolve({
                    statusCode: 200,
                });
            }
            resend(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                throw new Error('Method not implemented.');
            }
        })();
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children: createElement(
                                    VerifyEmailRequesterProvider,
                                    {
                                        requester,
                                        children: createElement(AuthProvider, {
                                            children,
                                        }),
                                    }
                                ),
                            }),
                        }),
                        loader: vi.fn(async () => emailVerifyLoaderReturn),
                        HydrateFallback: () => null,
                    },
                ],
                {
                    initialEntries: [{ pathname: '/' }],
                    initialIndex: 0,
                }
            );

            return createElement(RouterProvider, {
                router,
            });
        };
        const { result } = renderHook(
            () => {
                return useVerifyEmailVerification(emailRedirect);
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(result.current[0]).toBe(true);
            const user = JSON.parse(
                localStorage.getItem('user') ?? ''
            ) as AuthUser;
            expect(user.emailVerified).toBe(true);
        });
    });
    it('runs when request returns status code equals 422 correctly', async () => {
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: false,
                name: faker.person.firstName(),
                token: faker.word.noun(),
                abilities: [],
            })
        );
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const emailVerifyLoaderReturn = {
            expires: faker.number.int({ min: 1 }),
            signature: faker.word.noun(),
        };
        const emailRedirect = {
            id: faker.number.int({ min: 1 }).toString(),
            hash: faker.word.noun(),
        };
        const requester = new (class implements VerifyEmailRequester {
            verify(token: string, data: ResendParams[1]): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [data.id, token];
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            status: 'error',
                        },
                    },
                });
            }
            resend(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                throw new Error('Method not implemented.');
            }
        })();
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children: createElement(
                                    VerifyEmailRequesterProvider,
                                    {
                                        requester,
                                        children: createElement(AuthProvider, {
                                            children,
                                        }),
                                    }
                                ),
                            }),
                        }),
                        loader: vi.fn(async () => emailVerifyLoaderReturn),
                        HydrateFallback: () => null,
                    },
                ],
                {
                    initialEntries: [{ pathname: '/' }],
                    initialIndex: 0,
                }
            );

            return createElement(RouterProvider, {
                router,
            });
        };
        renderHook(
            () => {
                return useVerifyEmailVerification(emailRedirect);
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'error',
                payload: {
                    message: 'Verificação de e-mail expirada!',
                    type: 'generic',
                },
            });
            expect(onNavigate).toHaveBeenCalledWith('/email/verify', {
                replace: true,
            });
        });
    });
});
