import { AuthProvider } from '@/shared/providers/AuthProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { loginBase } from '@/shared/utils/globals/login';
import { renderHook } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useLoginStateAction } from './useLoginStateAction';

describe('useAuthSubmit hook', () => {
    it("runs hook's returns correctly", async () => {
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
                                    children: createElement(LogicBaseProvider, {
                                        base: loginBase,
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
        const { result } = renderHook(
            () => {
                return useLoginStateAction();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it("runs hook's some input ref is nullable correctly", async () => {
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
                                    children: createElement(LogicBaseProvider, {
                                        base: loginBase,
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
        const { result } = renderHook(
            () => {
                return useLoginStateAction();
            },
            { wrapper }
        );
        result.current(
            {
                requestStatus: { statusCode: 0 },
                fields: { email: '', password: '' },
            },
            new FormData()
        );
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs requesting and returning the status code equals 200 correctly', async () => {
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
                                    children: createElement(LogicBaseProvider, {
                                        base: loginBase,
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
        const { result } = renderHook(
            () => {
                return useLoginStateAction();
            },
            { wrapper }
        );
        await result.current(
            {
                requestStatus: { statusCode: 0 },
                fields: { email: '', password: '' },
            },
            new FormData()
        );
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'success',
            payload: 'Logado com sucesso!',
        });
    });
    it('runs requesting and returning the status code equals 422 correctly', async () => {
        const errorMessage = 'obrigatório';
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
                                    children: createElement(LogicBaseProvider, {
                                        base: loginBase,
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
        const { result } = renderHook(
            () => {
                return useLoginStateAction();
            },
            { wrapper }
        );
        await result.current(
            {
                requestStatus: { statusCode: 0 },
                fields: { email: '', password: '' },
            },
            new FormData()
        );
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'field',
                field: 'email',
            },
        });
    });
});
