import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { ResetPasswordHandlerProvider } from '@/shared/providers/guest/ResetPasswordHandlerProvider';
import { ResetPasswordHandler } from '@/shared/types/Contracts/Guest/ResetPasswordHandler';
import { HttpClient } from '@/shared/types/Contracts/HttpClient';
import { ResetPasswordData } from '@/shared/types/Parameters/ResetPasswordData';
import { renderHook } from '@testing-library/react';
import { createElement, FormEvent, PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useResetPasswordSubmit } from './useResetPasswordSubmit';

type LocalNavigateReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalNavigateReturn>;

const makeFormEvent = () => {
    return {
        preventDefault: () => {},
    } as unknown as FormEvent<HTMLFormElement>;
};

describe('useResetPasswordSubmit hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    afterEach(() => {
        localNavigateSpy.mockReset();
    });
    it("runs hook's returns correctly", async () => {
        const handler = new (class implements ResetPasswordHandler {
            reset(data: ResetPasswordData): ReturnType<HttpClient['request']> {
                if (typeof data.email === 'undefined') {
                    throw data.password;
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
                                    ResetPasswordHandlerProvider,
                                    {
                                        handler,
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
                return useResetPasswordSubmit();
            },
            { wrapper }
        );
        expect(result.current.emailRef.current).toBeNull();
        expect(result.current.passConfirmRef.current).toBeNull();
        expect(result.current.passwordRef.current).toBeNull();
        expect(result.current.tokenRef.current).toBeNull();
        expect(typeof result.current.handler).toBe('function');
    });
    it('runs with some ref nullable correctly', async () => {
        const handler = new (class implements ResetPasswordHandler {
            reset(data: ResetPasswordData): ReturnType<HttpClient['request']> {
                if (typeof data.email === 'undefined') {
                    throw [data.password];
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
                                    ResetPasswordHandlerProvider,
                                    {
                                        handler,
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
                return useResetPasswordSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {} as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs with request resulting on status code equal 200 correctly', async () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(onNavigate);

        const handler = new (class implements ResetPasswordHandler {
            reset(data: ResetPasswordData): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.password;
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
                                    ResetPasswordHandlerProvider,
                                    {
                                        handler,
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
                return useResetPasswordSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passConfirmRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passwordRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.tokenRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenCalledWith({ type: 'loading' });
        expect(onNavigate).toHaveBeenCalledWith('/');
    });
    it('runs with request resulting on status code equal 422 correctly', async () => {
        const errorMessage = 'obrigatório';
        const handler = new (class implements ResetPasswordHandler {
            reset(data: ResetPasswordData): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.password;
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            password: [errorMessage],
                        },
                    },
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
                                    ResetPasswordHandlerProvider,
                                    {
                                        handler,
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
                return useResetPasswordSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passConfirmRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passwordRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.tokenRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'field',
                field: 'password',
            },
        });
    });
});
