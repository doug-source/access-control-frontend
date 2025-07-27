import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { type SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import { type AbilityCreationParams } from '@/shared/types/Parameters/AbilityCreation';
import { RoleCreationParams } from '@/shared/types/Parameters/RoleCreation';
import { UserCreationParams } from '@/shared/types/Parameters/UserCreation';
import { type Paths } from '@/shared/types/Urls/Paths';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type FormEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useUserFormSubmit } from './useUserFormSubmit';

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

const makeFormEvent = () => {
    return { preventDefault() {} } as unknown as FormEvent<HTMLFormElement>;
};

describe('useUserFormSubmit hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    afterEach(() => {
        localNavigateSpy.mockReset();
        localStorage.clear();
    });
    it("runs hook's returns correctly", async () => {
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
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
                                children: createElement(CreatorProvider, {
                                    creator,
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
                return useUserFormSubmit();
            },
            { wrapper }
        );
        expect(result.current.emailRef.current).toBeNull();
        expect(result.current.nameRef.current).toBeNull();
        expect(result.current.passwordRef.current).toBeNull();
        expect(typeof result.current.handler).toBe('function');
    });
    it("runs hook's some input ref is nullable correctly", async () => {
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
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
                                children: createElement(CreatorProvider, {
                                    creator,
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
                return useUserFormSubmit();
            },
            { wrapper }
        );
        await result.current.handler(makeFormEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs requesting and returning the status code equals 201 correctly', async () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
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
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
        })();
        window.localStorage.setItem(
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
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children: createElement(CreatorProvider, {
                                    creator,
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
        const { result } = renderHook(
            () => {
                return useUserFormSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.nameRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passwordRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(onNavigate).toHaveBeenCalledWith('/users', { replace: true });
    });
    it('runs requesting and returning the status code equals 422 correctly', async () => {
        const errorMessage = 'obrigatório';
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            name: [errorMessage],
                        },
                    },
                });
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [data.name, token];
                }
                throw new Error('Method not implemented.');
            }
        })();
        window.localStorage.setItem(
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
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(HttpClientProvider, {
                                children: createElement(CreatorProvider, {
                                    creator,
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
        const { result } = renderHook(
            () => {
                return useUserFormSubmit();
            },
            { wrapper }
        );
        result.current.emailRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.nameRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        result.current.passwordRef.current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current.handler(makeFormEvent());
        expect(onNavigate).not.toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'field',
                field: 'name',
            },
        });
    });
});
