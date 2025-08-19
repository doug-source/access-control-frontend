import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { AuthUser } from '@/shared/types/NullableUser';
import { VerifyEmailState } from '@/shared/types/States';
import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import {
    createElement,
    Dispatch,
    SetStateAction,
    useRef,
    type PropsWithChildren,
} from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useVerifyEmailOutput } from './useVerifyEmailOutput';

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

describe('useVerifyEmailVerification hook', () => {
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
    it('runs when request returns status code equals 200 correctly', async () => {
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: false,
                name: faker.person.firstName(),
                token: faker.word.noun(),
                abilities: [],
            })
        );
        const emailVerifyLoaderReturn = {
            expires: faker.number.int({ min: 1 }),
            signature: faker.word.noun(),
        };
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(HttpClientProvider, {
                            children: createElement(AuthProvider, {
                                children,
                            }),
                        }),
                        loader: vi.fn(async () => emailVerifyLoaderReturn),
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
                const ref = useRef<Dispatch<
                    SetStateAction<VerifyEmailState>
                > | null>(null);
                return useVerifyEmailOutput(
                    {
                        requestStatus: { statusCode: -1 },
                        resend: false,
                        verified: false,
                    },
                    ref
                );
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(result.current).toBeTruthy();
            const user = JSON.parse(
                localStorage.getItem('user') ?? ''
            ) as AuthUser;
            expect(user.emailVerified).toBe(true);
        });
    });
    it('runs when request returns status code equals 422 correctly', async () => {
        localStorage.setItem(
            'user',
            JSON.stringify({
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: false,
                name: faker.person.firstName(),
                token: faker.word.noun(),
                abilities: [],
            })
        );
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const emailVerifyLoaderReturn = {
            expires: faker.number.int({ min: 1 }),
            signature: faker.word.noun(),
        };
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(HttpClientProvider, {
                            children: createElement(AuthProvider, {
                                children,
                            }),
                        }),
                        loader: vi.fn(async () => emailVerifyLoaderReturn),
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
                const ref = useRef<Dispatch<
                    SetStateAction<VerifyEmailState>
                > | null>(null);
                return useVerifyEmailOutput(
                    {
                        requestStatus: { statusCode: -1 },
                        resend: false,
                        verified: false,
                    },
                    ref
                );
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(onNavigate).toHaveBeenCalledWith('/email/verify', {
                replace: true,
            });
        });
    });
});
