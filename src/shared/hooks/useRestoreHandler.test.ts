import { useRestoreHandler } from '@/shared/hooks/useRestoreHandler';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PageRequesterWithRestoreProvider } from '@/shared/providers/PageRequesterWithRestoreProvider';
import type { PageRequesterWithRestore } from '@/shared/types/Contracts/PageRequesterWithRestore';
import type { Paths } from '@/shared/types/Urls/Paths';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

describe('useRestoreHandler hook', () => {
    it('renders with resulting output correctly', async () => {
        const requester = new (class implements PageRequesterWithRestore {
            restore(
                token: string,
                url: Paths['endpoint']['restorations'],
                id: number
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, id];
                }
                throw new Error('Method not implemented.');
            }
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, qs];
                }
                throw new Error('Method not implemented.');
            }
            remove(
                token: string,
                url: Paths['endpoint']['remotions']
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url];
                }
                throw new Error('Method not implemented.');
            }
            abortRequest(): void {
                throw new Error('abortRequest');
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
                                    PageRequesterWithRestoreProvider,
                                    {
                                        requester: requester,
                                        children,
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

        const data = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const { result } = renderHook(
            () => {
                return useRestoreHandler(data, '/api/users/restore');
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('renders requesting with requester equals null correctly', async () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children,
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

        const data = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const { result } = renderHook(
            () => {
                return useRestoreHandler(data, '/api/users/restore');
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders requesting with data nullable correctly', async () => {
        const requester = new (class implements PageRequesterWithRestore {
            restore(
                token: string,
                url: Paths['endpoint']['restorations'],
                id: number
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, id];
                }
                throw new Error('Method not implemented.');
            }
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, qs];
                }
                throw new Error('Method not implemented.');
            }
            remove(
                token: string,
                url: Paths['endpoint']['remotions']
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url];
                }
                throw new Error('Method not implemented.');
            }
            abortRequest(): void {
                throw new Error('abortRequest');
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
                                    PageRequesterWithRestoreProvider,
                                    {
                                        requester: requester,
                                        children,
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
                return useRestoreHandler(null, '/api/users/restore');
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders requesting with token undefined correctly', async () => {
        const requester = new (class implements PageRequesterWithRestore {
            restore(
                token: string,
                url: Paths['endpoint']['restorations'],
                id: number
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, id];
                }
                throw new Error('Method not implemented.');
            }
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, qs];
                }
                throw new Error('Method not implemented.');
            }
            remove(
                token: string,
                url: Paths['endpoint']['remotions']
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw url;
                }
                throw new Error('Method not implemented.');
            }
            abortRequest(): void {
                throw new Error('abortRequest');
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
                                    PageRequesterWithRestoreProvider,
                                    {
                                        requester: requester,
                                        children,
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

        const data = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const { result } = renderHook(
            () => {
                return useRestoreHandler(data, '/api/users/restore');
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders requesting and outputing status code equals 200 correctly', async () => {
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
        const requester = new (class implements PageRequesterWithRestore {
            restore(
                token: string,
                url: Paths['endpoint']['restorations'],
                id: number
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, id];
                }
                return Promise.resolve({
                    statusCode: 200,
                });
            }
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, qs];
                }
                throw new Error('Method not implemented.');
            }
            remove(
                token: string,
                url: Paths['endpoint']['remotions']
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw url;
                }
                throw new Error('Method not implemented.');
            }
            abortRequest(): void {
                throw new Error('abortRequest');
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
                                    PageRequesterWithRestoreProvider,
                                    {
                                        requester: requester,
                                        children,
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

        const data = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const { result } = renderHook(
            () => {
                return useRestoreHandler(data, '/api/users/restore');
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'restoration-success',
            payload: data,
        });
    });
    it('renders requesting and outputing status code equals 422 correctly', async () => {
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
        const errorMessage = 'invalid';
        const requester = new (class implements PageRequesterWithRestore {
            restore(
                token: string,
                url: Paths['endpoint']['restorations'],
                id: number
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, id];
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            id: [errorMessage],
                        },
                    },
                });
            }
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, qs];
                }
                throw new Error('Method not implemented.');
            }
            remove(
                token: string,
                url: Paths['endpoint']['remotions']
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw url;
                }
                throw new Error('Method not implemented.');
            }
            abortRequest(): void {
                throw new Error('abortRequest');
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
                                    PageRequesterWithRestoreProvider,
                                    {
                                        requester: requester,
                                        children,
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

        const data = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const { result } = renderHook(
            () => {
                return useRestoreHandler(data, '/api/users/restore');
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'field',
                field: 'id',
            },
        });
    });
});
