import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useLoginProvided } from './useLoginProvided';

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

describe('useLoginProvided hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    beforeEach(() => {
        localNavigateSpy.mockReset();
    });
    it('runs with request resulting on status code equal 200 correctly', async () => {
        const body = {
            user: {
                id: faker.number.int({ min: 1 }).toString(),
                email: faker.internet.email(),
                emailVerified: true,
                name: faker.person.firstName(),
                token: faker.word.noun(),
                abilities: [],
            },
        };
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(AuthProvider, {
                            children,
                        }),
                        loader: vi.fn(async () => ({ statusCode: 200, body })),
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
                return useLoginProvided({
                    requestStatus: { statusCode: -1 },
                    fields: { email: '', password: '' },
                    user: null,
                });
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(result.current).toBeTruthy();
            expect(localStorage.getItem('user')).toBeTruthy();
        });
    });
    it('runs with request resulting on status code equal 422 correctly', async () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const dispatch = vi.fn();
        const errorMessage = 'obrigatório';
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children,
                        }),
                        loader: vi.fn(async () => ({
                            statusCode: 422,
                            body: { errors: { email: [errorMessage] } },
                        })),
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
                return useLoginProvided({
                    requestStatus: { statusCode: -1 },
                    fields: { email: '', password: '' },
                    user: null,
                });
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(onNavigate).toHaveBeenCalledWith('/');
            expect(dispatch).toHaveBeenCalledWith({
                type: 'error',
                payload: {
                    message: errorMessage,
                    type: 'field',
                    field: 'email',
                },
            });
            expect(result.current).toBeFalsy();
        });
    });
});
