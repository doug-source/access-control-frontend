import { useDetachHandler } from '@/shared/hooks/useDetachHandler';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { PermissionsRequesterProvider } from '@/shared/providers/PermissionsRequesterProvider';
import type { PermissionsRelationRequester } from '@/shared/types/Contracts/PermissionsRelationRequester';
import type { Paths } from '@/shared/types/Urls/Paths';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

describe('useDetachHandler hook', () => {
    it("renders hook's returns correctly", () => {
        const requester = new (class implements PermissionsRelationRequester {
            attach(
                token: string,
                url: Paths['endpoint']['attachments'],
                included: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, included];
                }
                throw new Error('Method not implemented.');
            }
            detach(
                token: string,
                url: Paths['endpoint']['detachments'],
                removed: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, removed];
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
                                    PermissionsRequesterProvider,
                                    {
                                        requester,
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
                return useDetachHandler(
                    {
                        id: faker.number.int({ min: 1 }),
                        name: faker.word.noun(),
                    },
                    `/api/users/${faker.number.int({ min: 1 })}/roles`,
                    faker.word.noun()
                );
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('renders triggering with permissionsRequester being nullable correctly', async () => {
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
        const { result } = renderHook(
            () => {
                return useDetachHandler(
                    {
                        id: faker.number.int({ min: 1 }),
                        name: faker.word.noun(),
                    },
                    `/api/users/${faker.number.int({ min: 1 })}/roles`,
                    faker.word.noun()
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders triggering with token being undefined correctly', async () => {
        const requester = new (class implements PermissionsRelationRequester {
            attach(
                token: string,
                url: Paths['endpoint']['attachments'],
                included: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, included];
                }
                throw new Error('Method not implemented.');
            }
            detach(
                token: string,
                url: Paths['endpoint']['detachments'],
                removed: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, removed];
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
                                    PermissionsRequesterProvider,
                                    {
                                        requester,
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
                return useDetachHandler(
                    {
                        id: faker.number.int({ min: 1 }),
                        name: faker.word.noun(),
                    },
                    `/api/users/${faker.number.int({ min: 1 })}/roles`,
                    faker.word.noun()
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders triggering with data being nullable correctly', async () => {
        const requester = new (class implements PermissionsRelationRequester {
            attach(
                token: string,
                url: Paths['endpoint']['attachments'],
                included: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, included];
                }
                throw new Error('Method not implemented.');
            }
            detach(
                token: string,
                url: Paths['endpoint']['detachments'],
                removed: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, removed];
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
                                    PermissionsRequesterProvider,
                                    {
                                        requester,
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
                return useDetachHandler(
                    null,
                    `/api/users/${faker.number.int({ min: 1 })}/roles`,
                    faker.word.noun()
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders requesting with status code equals 200 correctly', async () => {
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
        const requester = new (class implements PermissionsRelationRequester {
            attach(
                token: string,
                url: Paths['endpoint']['attachments'],
                included: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, included];
                }
                throw new Error('Method not implemented.');
            }
            detach(
                token: string,
                url: Paths['endpoint']['detachments'],
                removed: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, removed];
                }
                return Promise.resolve({
                    statusCode: 204,
                });
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
                                    PermissionsRequesterProvider,
                                    {
                                        requester,
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
                return useDetachHandler(
                    data,
                    `/api/users/${faker.number.int({ min: 1 })}/roles`,
                    faker.word.noun()
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'detachment-success',
            payload: data,
        });
    });
    it('renders requesting with status code equals 422 correctly', async () => {
        const errorMessage = 'invalid';
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
        const requester = new (class implements PermissionsRelationRequester {
            attach(
                token: string,
                url: Paths['endpoint']['attachments'],
                included: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, included];
                }
                throw new Error('Method not implemented.');
            }
            detach(
                token: string,
                url: Paths['endpoint']['detachments'],
                removed: string[]
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, removed];
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            removed: [errorMessage],
                        },
                    },
                });
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
                                    PermissionsRequesterProvider,
                                    {
                                        requester,
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
                return useDetachHandler(
                    data,
                    `/api/users/${faker.number.int({ min: 1 })}/roles`,
                    faker.word.noun()
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'field',
                field: 'removed',
            },
        });
    });
});
