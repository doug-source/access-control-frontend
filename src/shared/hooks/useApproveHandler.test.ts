import { type PageRequesterWithApprove } from '@/shared/types/Contracts/PageRequesterWithApprove';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AuthProvider } from '../providers/AuthProvider';
import { DispatchProvider } from '../providers/DispatchProvider';
import { HttpClientProvider } from '../providers/HttpClientProvider';
import { PageRequesterWithApproveProvider } from '../providers/PageRequesterWithApproveProvider';
import { Paths } from '../types/Urls/Paths';
import { useApproveHandler } from './useApproveHandler';

describe('useApproveHandler hook', () => {
    it('renders correctly', () => {
        const requester = new (class implements PageRequesterWithApprove {
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [qs, url];
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
            approve(
                token: string,
                url: Paths['endpoint']['approvements']
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
                                    PageRequesterWithApproveProvider,
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
                return useApproveHandler(
                    {
                        id: faker.number.int({ min: 1 }),
                        email: faker.internet.email(),
                    },
                    `/api/registers/requests/${faker.number.int({
                        min: 1,
                    })}/approval`
                );
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('renders triggering handler when requester is nullable correctly', async () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children: createElement(AuthProvider, {
                                    children,
                                }),
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
                return useApproveHandler(
                    {
                        id: faker.number.int({ min: 1 }),
                        email: faker.internet.email(),
                    },
                    `/api/registers/requests/${faker.number.int({
                        min: 1,
                    })}/approval`
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders triggering handler when data is undefined correctly', async () => {
        const requester = new (class implements PageRequesterWithApprove {
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [qs, url];
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
            approve(
                token: string,
                url: Paths['endpoint']['approvements']
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
                                    PageRequesterWithApproveProvider,
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
                return useApproveHandler(
                    null,
                    `/api/registers/requests/${faker.number.int({
                        min: 1,
                    })}/approval`
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders triggering handler when token is undefined correctly', async () => {
        const requester = new (class implements PageRequesterWithApprove {
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [qs, url];
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
            approve(
                token: string,
                url: Paths['endpoint']['approvements']
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
                                    PageRequesterWithApproveProvider,
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
                return useApproveHandler(
                    {
                        id: faker.number.int({ min: 1 }),
                        email: faker.internet.email(),
                    },
                    `/api/registers/requests/${faker.number.int({
                        min: 1,
                    })}/approval`
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders triggering handler with status code equals to 200 correctly', async () => {
        const requester = new (class implements PageRequesterWithApprove {
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [qs, url];
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
            approve(
                token: string,
                url: Paths['endpoint']['approvements']
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw url;
                }
                return Promise.resolve({
                    statusCode: 200,
                });
            }
            abortRequest(): void {
                throw new Error('abortRequest');
            }
        })();
        const dispatch = vi.fn();
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
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children: createElement(
                                    PageRequesterWithApproveProvider,
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
        const registerRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
        };
        const { result } = renderHook(
            () => {
                return useApproveHandler(
                    registerRequest,
                    `/api/registers/requests/${faker.number.int({
                        min: 1,
                    })}/approval`
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'approvement-success',
            payload: registerRequest,
        });
    });
    it('renders triggering handler with status code equals to 422 correctly', async () => {
        const errorMessage = 'error';
        const requester = new (class implements PageRequesterWithApprove {
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [qs, url];
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
            approve(
                token: string,
                url: Paths['endpoint']['approvements']
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw url;
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            status: [errorMessage],
                        },
                    },
                });
            }
            abortRequest(): void {
                throw new Error('abortRequest');
            }
        })();
        const dispatch = vi.fn();
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
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children: createElement(
                                    PageRequesterWithApproveProvider,
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
        const registerRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
        };
        const { result } = renderHook(
            () => {
                return useApproveHandler(
                    registerRequest,
                    `/api/registers/requests/${faker.number.int({
                        min: 1,
                    })}/approval`
                );
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'generic',
            },
        });
    });
});
