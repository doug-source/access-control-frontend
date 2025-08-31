import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { DispatchProvider } from '../providers/DispatchProvider';
import { HttpClientProvider } from '../providers/HttpClientProvider';
import { PageRequesterProvider } from '../providers/PageRequesterProvider';
import type { PageRequester } from '../types/Contracts/PageRequester';
import type { Paths } from '../types/Urls/Paths';
import { useRemoveHandler } from './useRemoveHandler';

describe('useRemoveHandler hook', () => {
    afterEach(() => {
        localStorage.clear();
    });
    it('renders with resulting output correctly', async () => {
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
        const requester = new (class implements PageRequester {
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
                                children: createElement(PageRequesterProvider, {
                                    pageRequester: requester,
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

        const data = { id: faker.number.int({ min: 1 }) };
        const { result } = renderHook(
            () => {
                return useRemoveHandler(data, '/api/abilities');
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('renders requesting with token undefined correctly', async () => {
        const requester = new (class implements PageRequester {
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
                                children: createElement(PageRequesterProvider, {
                                    pageRequester: requester,
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

        const data = { id: faker.number.int({ min: 1 }) };
        const { result } = renderHook(
            () => {
                return useRemoveHandler(data, '/api/abilities');
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders requesting with data nullable correctly', async () => {
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
        const requester = new (class implements PageRequester {
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
                                children: createElement(PageRequesterProvider, {
                                    pageRequester: requester,
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
                return useRemoveHandler(null, '/api/abilities');
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
        const requester = new (class implements PageRequester {
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
                return Promise.resolve({
                    statusCode: 200,
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
                                children: createElement(PageRequesterProvider, {
                                    pageRequester: requester,
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
        const data = { id: faker.number.int({ min: 1 }) };
        const { result } = renderHook(
            () => {
                return useRemoveHandler(data, '/api/abilities');
            },
            { wrapper }
        );
        await result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'remotion-success',
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
        const requester = new (class implements PageRequester {
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
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            id: [errorMessage],
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
                                children: createElement(PageRequesterProvider, {
                                    pageRequester: requester,
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
        const data = { id: faker.number.int({ min: 1 }) };
        const { result } = renderHook(
            () => {
                return useRemoveHandler(data, '/api/abilities');
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
