import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useRegisterRequestProvided } from './useRegisterRequestProvided';

describe('useRegisterRequestProvided hook', () => {
    it('runs with request resulting on status code equal 201 correctly', async () => {
        const onNavigate = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
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
                return useRegisterRequestProvided({
                    requestStatus: { statusCode: 0 },
                    fields: { email: '', phone: '' },
                });
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
        const dispatch = vi.fn();
        const errorMessage = 'obrigatório';
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
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
                return useRegisterRequestProvided({
                    requestStatus: { statusCode: 0 },
                    fields: { email: '', phone: '' },
                });
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
