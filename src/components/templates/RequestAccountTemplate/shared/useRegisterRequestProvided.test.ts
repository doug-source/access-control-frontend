import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useRegisterRequestProvided } from './useRegisterRequestProvided';

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

describe('useRegisterRequestProvided hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    beforeEach(() => {
        localNavigateSpy.mockReset();
    });
    it('runs with request resulting on status code equal 201 correctly', async () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const dispatch = vi.fn();
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
                            statusCode: 201,
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
        renderHook(
            () => {
                return useRegisterRequestProvided();
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(onNavigate).toHaveBeenCalledWith('/request');
            expect(dispatch).toHaveBeenCalledWith({
                type: 'success',
                payload: 'Registrado!',
            });
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
        renderHook(
            () => {
                return useRegisterRequestProvided();
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(onNavigate).toHaveBeenCalledWith('/request');
            expect(dispatch).toHaveBeenCalledWith({
                type: 'error',
                payload: {
                    message: errorMessage,
                    type: 'field',
                    field: 'email',
                },
            });
        });
    });
});
