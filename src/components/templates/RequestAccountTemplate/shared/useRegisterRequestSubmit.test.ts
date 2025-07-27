import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { RegisterRequestMakerProvider } from '@/shared/providers/guest/RegisterRequestMakerProvider';
import { RegisterRequestMaker } from '@/shared/types/Contracts/Guest/RegisterRequestMaker';
import { renderHook } from '@testing-library/react';
import { createElement, type FormEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useRegisterRequestSubmit } from './useRegisterRequestSubmit';

const makeFormEvent = () => {
    return { preventDefault() {} } as unknown as FormEvent<HTMLFormElement>;
};

describe('useRegisterRequestSubmit hook', () => {
    it("runs hook's returns correctly", async () => {
        const maker = new (class implements RegisterRequestMaker {
            provide(data: { email: string; phone?: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.phone;
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
                                    RegisterRequestMakerProvider,
                                    {
                                        maker,
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
                return useRegisterRequestSubmit();
            },
            { wrapper }
        );
        expect(result.current.emailRef.current).toBeNull();
        expect(result.current.phoneRef.current).toBeNull();
        expect(typeof result.current.handler).toBe('function');
    });
    it("runs hook's some input ref is nullable correctly", async () => {
        const maker = new (class implements RegisterRequestMaker {
            provide(data: { email: string; phone?: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.phone;
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
                                    RegisterRequestMakerProvider,
                                    {
                                        maker,
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
                return useRegisterRequestSubmit();
            },
            { wrapper }
        );
        result.current.handler(makeFormEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs requesting and returning the status code equals 201 correctly', async () => {
        const maker = new (class implements RegisterRequestMaker {
            provide(data: { email: string; phone?: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.phone;
                }
                return Promise.resolve({
                    statusCode: 201,
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
                                    RegisterRequestMakerProvider,
                                    {
                                        maker,
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
                return useRegisterRequestSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.phoneRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'success',
            payload: 'Requisitado!',
        });
    });
    it('runs requesting and returning the status code equals 422 correctly', async () => {
        const errorMessage = 'obrigatório';
        const maker = new (class implements RegisterRequestMaker {
            provide(data: { email: string; phone?: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.phone;
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            email: [errorMessage],
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
                                    RegisterRequestMakerProvider,
                                    {
                                        maker,
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
                return useRegisterRequestSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.phoneRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
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
