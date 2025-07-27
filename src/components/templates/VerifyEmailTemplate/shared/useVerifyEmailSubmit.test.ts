import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { VerifyEmailRequesterProvider } from '@/shared/providers/VerifyEmailRequesterProvider';
import { type VerifyEmailRequester } from '@/shared/types/Contracts/VerifyEmailRequester';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type FormEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useVerifyEmailSubmit } from './useVerifyEmailSubmit';

type ResendParams = Parameters<VerifyEmailRequester['verify']>;

const makeFormEvent = () => {
    return { preventDefault() {} } as unknown as FormEvent<HTMLFormElement>;
};

describe('useVerifyEmailSubmit hook', () => {
    afterEach(() => {
        localStorage.clear();
    });
    it("runs hook's returns correctly", async () => {
        window.localStorage.setItem(
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
        const requester = new (class implements VerifyEmailRequester {
            verify(token: string, data: ResendParams[1]): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [data.id, token];
                }
                throw new Error('Method not implemented.');
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
                return useVerifyEmailSubmit();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it("runs auth or auth's user is nullable correctly", async () => {
        const requester = new (class implements VerifyEmailRequester {
            verify(token: string, data: ResendParams[1]): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [data.id, token];
                }
                throw new Error('Method not implemented.');
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
                return useVerifyEmailSubmit();
            },
            { wrapper }
        );
        await result.current(makeFormEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs requesting and returning the status code equals 201 correctly', async () => {
        window.localStorage.setItem(
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
        const requester = new (class implements VerifyEmailRequester {
            verify(token: string, data: ResendParams[1]): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [data.id, token];
                }
                throw new Error('Method not implemented.');
            }
            resend(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                return Promise.resolve({
                    statusCode: 200,
                });
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
                return useVerifyEmailSubmit();
            },
            { wrapper }
        );
        await result.current(makeFormEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'success',
            payload: 'Email enviado!',
        });
    });
    it('runs requesting and returning the status code equals 422 correctly', async () => {
        window.localStorage.setItem(
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
        const requester = new (class implements VerifyEmailRequester {
            verify(token: string, data: ResendParams[1]): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [data.id, token];
                }
                throw new Error('Method not implemented.');
            }
            resend(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                return Promise.resolve({
                    statusCode: 422,
                });
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
                return useVerifyEmailSubmit();
            },
            { wrapper }
        );
        await result.current(makeFormEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'error',
            payload: {
                type: 'generic',
                message: 'Erro na requisição!',
            },
        });
    });
});
