import { faker } from '@faker-js/faker';
import { renderHook, waitFor } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { useRegisterAccountProvided } from './useRegisterAccountProvided';

describe('useRegisterAccountProvided hook', () => {
    it('runs with LoaderData returned is falsy correctly', async () => {
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
                        loader: vi.fn(),
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
                return useRegisterAccountProvided({
                    requestStatus: { statusCode: 0 },
                    fields: {
                        email: '',
                        name: '',
                        passConfirm: '',
                        password: '',
                    },
                    token: '',
                });
            },
            { wrapper }
        );
    });
    it('runs with request resulting on status code equal 201 correctly', async () => {
        const token = faker.word.noun();
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
                        loader: vi.fn(async () => ({
                            statusCode: 201,
                            body: token,
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
                return useRegisterAccountProvided({
                    requestStatus: { statusCode: 0 },
                    fields: {
                        email: '',
                        name: '',
                        passConfirm: '',
                        password: '',
                    },
                    token: '',
                });
            },
            { wrapper }
        );
        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith({
                type: 'success',
                payload: token,
            });
        });
    });
    it('runs with request resulting on status code equal 422 correctly', async () => {
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
                return useRegisterAccountProvided({
                    requestStatus: { statusCode: 0 },
                    fields: {
                        email: '',
                        name: '',
                        passConfirm: '',
                        password: '',
                    },
                    token: '',
                });
            },
            { wrapper }
        );
    });
});
