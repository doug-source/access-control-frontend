import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useResetPasswordProvided } from './useResetPasswordProvided';

describe('useResetPasswordProvided hook', () => {
    it('runs with request resulting on status code equal 200 correctly', async () => {
        const dispatch = vi.fn();
        const body = {
            token: faker.word.noun(),
            email: faker.internet.email(),
        };
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
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
        renderHook(
            () => {
                return useResetPasswordProvided({
                    requestStatus: { statusCode: 0 },
                    email: '',
                    token: '',
                    fields: { passConfirm: '', password: '' },
                });
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'success',
                payload: body,
            });
        });
    });
    it('runs with request resulting on status code equal 422 correctly', async () => {
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
                            body: { errors: { password: [errorMessage] } },
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
                return useResetPasswordProvided({
                    requestStatus: { statusCode: 0 },
                    email: '',
                    token: '',
                    fields: { passConfirm: '', password: '' },
                });
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'error',
                payload: {
                    message: errorMessage,
                    type: 'field',
                    field: 'password',
                },
            });
        });
    });
});
