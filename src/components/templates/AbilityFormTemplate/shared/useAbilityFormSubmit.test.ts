import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { type SuperAdminCreator } from '@/shared/types/Contracts/SuperAdminCreator';
import { type AuthUser } from '@/shared/types/NullableUser';
import { AbilityCreationParams } from '@/shared/types/Parameters/AbilityCreation';
import { RoleCreationParams } from '@/shared/types/Parameters/RoleCreation';
import { UserCreationParams } from '@/shared/types/Parameters/UserCreation';
import { type Paths } from '@/shared/types/Urls/Paths';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type FormEvent, type PropsWithChildren } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { type MockInstance } from 'vitest';
import { useAbilityFormSubmit } from './useAbilityFormSubmit';

type LocalNavigateReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalNavigateReturn>;

const makeMouseEvent = () => {
    return {
        preventDefault: vi.fn(),
    } as unknown as FormEvent<HTMLFormElement>;
};

describe('useAbilityFormSubmit hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    afterEach(() => {
        localNavigateSpy.mockReset();
        window.localStorage.clear();
    });
    it('runs with output returned correctly', () => {
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));

        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: createElement(AuthProvider, {
                            children: createElement(DispatchProvider, {
                                dispatch,
                                children: createElement(HttpClientProvider, {
                                    children: createElement(CreatorProvider, {
                                        children,
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityFormSubmit();
            },
            { wrapper }
        );
        expect(result.current).toHaveLength(2);
        expect(result.current[0].current).toBeNull();
        expect(typeof result.current[1]).toBe('function');
    });
    it('runs when inputRefs are null correctly', async () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(onNavigate);
        const creator = {} as SuperAdminCreator;
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
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: createElement(AuthProvider, {
                            children: createElement(DispatchProvider, {
                                dispatch,
                                children: createElement(HttpClientProvider, {
                                    children: createElement(CreatorProvider, {
                                        creator,
                                        children,
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityFormSubmit();
            },
            { wrapper }
        );
        await result.current[1](makeMouseEvent());
        expect(onNavigate).not.toHaveBeenCalled();
    });
    it('runs with submit event handler triggering status code 200 correctly', async () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(onNavigate);
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                throw new Error(
                    `Method not implemented: ${url}, ${data?.name}, ${token}`
                );
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                throw new Error(
                    `Method not implemented: ${url}, ${data?.name}, ${token}`
                );
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [url, data.name, token];
                }
                return Promise.resolve({
                    statusCode: 201,
                });
            }
        })();
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));

        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: createElement(AuthProvider, {
                            children: createElement(DispatchProvider, {
                                dispatch,
                                children: createElement(HttpClientProvider, {
                                    children: createElement(CreatorProvider, {
                                        creator,
                                        children,
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityFormSubmit();
            },
            { wrapper }
        );
        result.current[0].current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current[1](makeMouseEvent());
        expect(onNavigate).toHaveBeenCalledWith('/abilities', {
            replace: true,
        });
    });
    it('runs with submit event handler triggering status code 422 correctly', async () => {
        const errorMessage = 'obrigatório';
        const errorField = 'name';
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(onNavigate);
        const creator = new (class implements SuperAdminCreator {
            storeUser(
                url: Paths['endpoint']['creations']['user'],
                data: UserCreationParams,
                token: string
            ): Promise<unknown> {
                throw new Error(
                    `Method not implemented: ${url}, ${data?.name}, ${token}`
                );
            }
            storeRole(
                url: Paths['endpoint']['creations']['role'],
                data: RoleCreationParams,
                token: string
            ): Promise<unknown> {
                throw new Error(
                    `Method not implemented: ${url}, ${data?.name}, ${token}`
                );
            }
            storeAbility(
                url: Paths['endpoint']['creations']['ability'],
                data: AbilityCreationParams,
                token: string
            ): Promise<unknown> {
                if (typeof url === 'undefined') {
                    throw [url, data.name, token];
                }
                return Promise.resolve({
                    statusCode: 422,
                    body: {
                        errors: {
                            [errorField]: [errorMessage],
                        },
                    },
                });
            }
        })();
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));

        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: createElement(AuthProvider, {
                            children: createElement(DispatchProvider, {
                                dispatch,
                                children: createElement(HttpClientProvider, {
                                    children: createElement(CreatorProvider, {
                                        creator,
                                        children,
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityFormSubmit();
            },
            { wrapper }
        );
        result.current[0].current = {
            value: '',
        } as unknown as HTMLInputElement;
        await result.current[1](makeMouseEvent());
        expect(dispatch).toHaveBeenNthCalledWith(1, { type: 'loading' });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'error',
            payload: {
                message: errorMessage,
                type: 'field',
                field: errorField,
            },
        });
    });
});
