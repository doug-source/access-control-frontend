import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { PageRequesterProvider } from '@/shared/providers/PageRequesterProvider';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { type PageRequester } from '@/shared/types/Contracts/PageRequester';
import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Paths } from '../types/Urls/Paths';
import { usePaginationListData } from './usePaginationListData';

describe('usePaginationListData hook', () => {
    it('renders requesting and receiving status code equals 200 correctly', async () => {
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
        const info = {
            data: [],
            total: 0,
            lastPage: 0,
        };
        const requester = new (class implements PageRequester {
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, qs];
                }
                return Promise.resolve({
                    statusCode: 200,
                    body: {
                        data: info.data,
                        total: info.total,
                        last_page: info.lastPage,
                    },
                });
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
                                    children: createElement(AuthProvider, {
                                        children,
                                    }),
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

        renderHook(
            () => {
                return usePaginationListData('/api/abilities', {
                    page: faker.number.int({ min: 1, max: 5 }),
                    group: faker.number.int({ min: 1, max: 5 }),
                    data: [],
                    error: null,
                    lastPage: faker.number.int({ min: 1, max: 5 }),
                    requestStatus: { statusCode: 0 },
                    requestType: 'list',
                    total: faker.number.int({ min: 1, max: 5 }),
                    warning: false,
                });
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'pagination-success',
                payload: info,
            });
        });
    });
    it('renders requesting and receiving status code equals 422 correctly', async () => {
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
        const requester = new (class implements PageRequester {
            paginate(
                token: string,
                url: Paths['endpoint']['paginations'],
                qs?: Record<string, string>
            ): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw [url, qs];
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            page: [errorMessage],
                        },
                    },
                });
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
                                    children: createElement(AuthProvider, {
                                        children,
                                    }),
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

        renderHook(
            () => {
                return usePaginationListData('/api/abilities', {
                    page: faker.number.int({ min: 1, max: 5 }),
                    group: faker.number.int({ min: 1, max: 5 }),
                    data: [],
                    error: null,
                    lastPage: faker.number.int({ min: 1, max: 5 }),
                    requestStatus: { statusCode: 0 },
                    requestType: 'list',
                    total: faker.number.int({ min: 1, max: 5 }),
                    warning: false,
                });
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'error',
                payload: {
                    message: errorMessage,
                    type: 'field',
                    field: 'page',
                },
            });
        });
    });
});
