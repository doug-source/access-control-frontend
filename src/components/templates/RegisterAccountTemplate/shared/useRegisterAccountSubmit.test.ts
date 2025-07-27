import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { type SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import { AbilityCreationParams } from '@/shared/types/Parameters/AbilityCreation';
import { RoleCreationParams } from '@/shared/types/Parameters/RoleCreation';
import { UserCreationParams } from '@/shared/types/Parameters/UserCreation';
import { Paths } from '@/shared/types/Urls/Paths';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type FormEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useRegisterAccountSubmit } from './useRegisterAccountSubmit';

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

const makeFormEvent = () => {
    return { preventDefault() {} } as unknown as FormEvent<HTMLFormElement>;
};

describe('useRegisterAccountSubmit hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    beforeEach(() => {
        localNavigateSpy.mockReset();
    });
    it("runs hook's returns correctly", async () => {
        const token = faker.word.noun();
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                throw new Error('Method not implemented.');
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
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
                                    children: createElement(CreatorProvider, {
                                        creator,
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
                return useRegisterAccountSubmit(token);
            },
            { wrapper }
        );
        expect(result.current.nameRef.current).toBeNull();
        expect(result.current.emailRef.current).toBeNull();
        expect(result.current.passwordRef.current).toBeNull();
        expect(result.current.passConfirmationRef.current).toBeNull();
        expect(typeof result.current.handler).toBe('function');
    });
    it("runs hook's some input ref is nullable correctly", async () => {
        const token = faker.word.noun();
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                throw new Error('Method not implemented.');
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
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
                                    children: createElement(CreatorProvider, {
                                        creator,
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
                return useRegisterAccountSubmit(token);
            },
            { wrapper }
        );
        result.current.handler(makeFormEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs requesting and returning the status code equals 200 correctly', async () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const token = faker.word.noun();
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                return Promise.resolve({
                    statusCode: 201,
                });
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
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
                                    children: createElement(CreatorProvider, {
                                        creator,
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
                return useRegisterAccountSubmit(token);
            },
            { wrapper }
        );
        result.current.nameRef.current = {} as unknown as HTMLInputElement;
        result.current.emailRef.current = {} as unknown as HTMLInputElement;
        result.current.passwordRef.current = {} as unknown as HTMLInputElement;
        result.current.passConfirmationRef.current =
            {} as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'success',
            payload: 'Registrado!',
        });
        expect(onNavigate).toHaveBeenCalledWith('/');
    });
    it('runs requesting and returning the status code equals 422 correctly', async () => {
        const errorMessage = 'obrigatório';
        const body = {
            errors: {
                name: [errorMessage],
            },
        };
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const token = faker.word.noun();
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                return Promise.resolve({
                    statusCode: 422,
                    body,
                });
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data, token];
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
                                    children: createElement(CreatorProvider, {
                                        creator,
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
                return useRegisterAccountSubmit(token);
            },
            { wrapper }
        );
        result.current.nameRef.current = {} as unknown as HTMLInputElement;
        result.current.emailRef.current = {} as unknown as HTMLInputElement;
        result.current.passwordRef.current = {} as unknown as HTMLInputElement;
        result.current.passConfirmationRef.current =
            {} as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'field',
                field: 'name',
            },
        });
        expect(onNavigate).not.toHaveBeenCalled();
    });
});
