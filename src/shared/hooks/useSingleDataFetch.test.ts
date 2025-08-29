import { AuthProvider } from '@/shared/providers/AuthProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { type Viewer } from '@/shared/types/Contracts/Viewer';
import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { HttpClientProvider } from '../providers/HttpClientProvider';
import { Paths } from '../types/Urls/Paths';
import { useSingleDataFetch } from './useSingleDataFetch';

describe('useSingleDataFetch hook', () => {
    it('renders with token undefined correctly', () => {
        const viewer = new (class implements Viewer {
            show(
                url: Paths['endpoint']['viewers'],
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw token;
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
                        element: createElement(HttpClientProvider, {
                            children: createElement(ViewerProvider, {
                                viewer,
                            }),
                        }),
                        children: [
                            {
                                path: '/',
                                element: createElement(DispatchProvider, {
                                    dispatch,
                                    children: createElement(AuthProvider, {
                                        children,
                                    }),
                                }),
                                HydrateFallback: () => null,
                            },
                        ],
                    },
                ],
                { initialEntries: ['/'], initialIndex: 0 }
            );
            return createElement(RouterProvider, {
                router,
            });
        };
        renderHook(
            () => {
                const endpoint = `/api/users/${faker.number.int()}` as const;
                return useSingleDataFetch(endpoint);
            },
            { wrapper }
        );
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders requesting outputing status code 200 correctly', async () => {
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
        const role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        const viewer = new (class implements Viewer {
            show(
                url: Paths['endpoint']['viewers'],
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw token;
                }
                return Promise.resolve({
                    statusCode: 200,
                    body: role,
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
                        element: createElement(HttpClientProvider, {
                            children: createElement(ViewerProvider, {
                                viewer,
                            }),
                        }),
                        children: [
                            {
                                path: '/',
                                element: createElement(DispatchProvider, {
                                    dispatch,
                                    children: createElement(AuthProvider, {
                                        children,
                                    }),
                                }),
                                HydrateFallback: () => null,
                            },
                        ],
                    },
                ],
                { initialEntries: ['/'], initialIndex: 0 }
            );
            return createElement(RouterProvider, {
                router,
            });
        };
        renderHook(
            () => {
                const endpoint = `/api/roles/${faker.number.int()}` as const;
                return useSingleDataFetch(endpoint);
            },
            { wrapper }
        );
        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'loading',
        });
        await waitFor(() => {
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: 'success',
                payload: role,
            });
        });
    });
    it('renders requesting outputing status code 422 correctly', async () => {
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
        const viewer = new (class implements Viewer {
            show(
                url: Paths['endpoint']['viewers'],
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw token;
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
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        element: createElement(HttpClientProvider, {
                            children: createElement(ViewerProvider, {
                                viewer,
                            }),
                        }),
                        children: [
                            {
                                path: '/',
                                element: createElement(DispatchProvider, {
                                    dispatch,
                                    children: createElement(AuthProvider, {
                                        children,
                                    }),
                                }),
                                HydrateFallback: () => null,
                            },
                        ],
                    },
                ],
                { initialEntries: ['/'], initialIndex: 0 }
            );
            return createElement(RouterProvider, {
                router,
            });
        };
        renderHook(
            () => {
                const endpoint = `/api/roles/${faker.number.int()}` as const;
                return useSingleDataFetch(endpoint);
            },
            { wrapper }
        );
        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'loading',
        });
        await waitFor(() => {
            expect(dispatch).toHaveBeenNthCalledWith(2, {
                type: 'error',
                payload: {
                    message: errorMessage,
                    type: 'generic',
                },
            });
        });
    });
});
