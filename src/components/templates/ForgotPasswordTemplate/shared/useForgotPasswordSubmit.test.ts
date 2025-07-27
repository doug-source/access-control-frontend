import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { ForgotPasswordHandlerProvider } from '@/shared/providers/guest/ForgotPasswordHandlerProvider';
import { type ForgotPasswordHandler } from '@/shared/types/Contracts/Guest/ForgotPasswordHandler';
import { type SubmitForgotData } from '@/shared/types/Parameters/SubmitForgotData';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, FormEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useForgotPasswordSubmit } from './useForgotPasswordSubmit';

const makeFormEvent = () => {
    return { preventDefault() {} } as unknown as FormEvent<HTMLFormElement>;
};

describe('useForgotPasswordSubmit hook', () => {
    it("runs hook's returns correctly", async () => {
        const handler = new (class implements ForgotPasswordHandler {
            sayYouForgot(data: SubmitForgotData): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.email;
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
                                    ForgotPasswordHandlerProvider,
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
                return useForgotPasswordSubmit();
            },
            { wrapper }
        );
        expect(result.current).toHaveLength(2);
        expect(result.current[0].current).toBeNull();
        expect(typeof result.current[1]).toBe('function');
    });
    it("runs hook's email input ref is nullable correctly", async () => {
        const handler = new (class implements ForgotPasswordHandler {
            sayYouForgot(data: SubmitForgotData): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.email;
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
                                    ForgotPasswordHandlerProvider,
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
                return useForgotPasswordSubmit();
            },
            { wrapper }
        );
        result.current[1](makeFormEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs requesting and returning the status code equals 200 correctly', async () => {
        const handler = new (class implements ForgotPasswordHandler {
            sayYouForgot(data: SubmitForgotData): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.email;
                }
                return Promise.resolve({
                    statusCode: 200,
                    body: {
                        token: faker.word.noun(),
                        email: faker.internet.email(),
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
                                    ForgotPasswordHandlerProvider,
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
                return useForgotPasswordSubmit();
            },
            { wrapper }
        );
        result.current[0].current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current[1](makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'success',
            payload: 'Solicitado!',
        });
    });
    it('runs requesting and returning the status code equals 422 correctly', async () => {
        const errorMessage = 'obrigatorio';
        const handler = new (class implements ForgotPasswordHandler {
            sayYouForgot(data: SubmitForgotData): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.email;
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
                                    ForgotPasswordHandlerProvider,
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
                return useForgotPasswordSubmit();
            },
            { wrapper }
        );
        result.current[0].current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current[1](makeFormEvent());
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
