import { AuthProvider } from '@/shared/providers/AuthProvider';
import { AuthenticatorProvider } from '@/shared/providers/boxes/AuthenticatorProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { type Authenticator } from '@/shared/types/Contracts/Authenticator';
import { type AuthUser } from '@/shared/types/NullableUser';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type FormEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useAuthSubmit } from './useAuthSubmit';

const makeFormEvent = () => {
    return { preventDefault() {} } as unknown as FormEvent<HTMLFormElement>;
};

describe('useAuthSubmit hook', () => {
    it("runs hook's returns correctly", async () => {
        const authenticator = new (class implements Authenticator {
            login(data: { email: string; password: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.password;
                }
                throw new Error('Method not implemented.');
            }
            logout(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                throw new Error('Method not implemented.');
            }
            provide(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
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
                                children: createElement(AuthProvider, {
                                    children: createElement(
                                        AuthenticatorProvider,
                                        {
                                            authenticator,
                                            children,
                                        }
                                    ),
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
                return useAuthSubmit();
            },
            { wrapper }
        );
        expect(result.current.emailRef.current).toBeNull();
        expect(result.current.passwordRef.current).toBeNull();
        expect(typeof result.current.handler).toBe('function');
    });
    it("runs hook's some input ref is nullable correctly", async () => {
        const authenticator = new (class implements Authenticator {
            login(data: { email: string; password: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.password;
                }
                throw new Error('Method not implemented.');
            }
            logout(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                throw new Error('Method not implemented.');
            }
            provide(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
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
                                children: createElement(AuthProvider, {
                                    children: createElement(
                                        AuthenticatorProvider,
                                        {
                                            authenticator,
                                            children,
                                        }
                                    ),
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
                return useAuthSubmit();
            },
            { wrapper }
        );
        result.current.handler(makeFormEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs requesting and returning the status code equals 200 correctly', async () => {
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
        };
        const authenticator = new (class implements Authenticator {
            login(data: { email: string; password: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.password;
                }
                return Promise.resolve({
                    statusCode: 200,
                    body: {
                        user: userSigned,
                    },
                });
            }
            logout(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                throw new Error('Method not implemented.');
            }
            provide(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
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
                                children: createElement(AuthProvider, {
                                    children: createElement(
                                        AuthenticatorProvider,
                                        {
                                            authenticator,
                                            children,
                                        }
                                    ),
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
                return useAuthSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passwordRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'success',
            payload: 'Logado com sucesso!',
        });
    });
    it('runs requesting and returning the status code equals 422 correctly', async () => {
        const errorMessage = 'obrigatório';
        const authenticator = new (class implements Authenticator {
            login(data: { email: string; password: string }): Promise<unknown> {
                if (typeof data.email === 'undefined') {
                    throw data.password;
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
            logout(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
                }
                throw new Error('Method not implemented.');
            }
            provide(token: string): Promise<unknown> {
                if (typeof token === 'undefined') {
                    throw token;
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
                                children: createElement(AuthProvider, {
                                    children: createElement(
                                        AuthenticatorProvider,
                                        {
                                            authenticator,
                                            children,
                                        }
                                    ),
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
                return useAuthSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passwordRef.current = {
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
