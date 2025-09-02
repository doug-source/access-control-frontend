import { useAbilityLocalDetachHandler } from '@/shared/hooks/useAbilityLocalDetachHandler';
import { DetachmentDataProvider } from '@/shared/providers/DetachmentDataProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';

describe('useAbilityLocalDetachHandler hook', () => {
    it("renders hook's returns correctly", () => {
        const detachmentData = {
            detachmentConfirm: true,
            onDetach: vi.fn(),
        };
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(DetachmentDataProvider, {
                                children,
                                ...detachmentData,
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
                return useAbilityLocalDetachHandler();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('renders when attachmentData is nullable correctly', () => {
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
                return useAbilityLocalDetachHandler();
            },
            { wrapper }
        );
        result.current({
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        });
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('renders when attachmentConfirm equals true correctly', () => {
        const detachmentData = { detachmentConfirm: true, onDetach: vi.fn() };
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(DetachmentDataProvider, {
                                children,
                                ...detachmentData,
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
                return useAbilityLocalDetachHandler();
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability);
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-detach',
            payload: ability,
        });
    });
    it('renders when attachmentConfirm equals false correctly', () => {
        const detachmentData = { detachmentConfirm: false, onDetach: vi.fn() };
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(DetachmentDataProvider, {
                                children,
                                ...detachmentData,
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
                return useAbilityLocalDetachHandler();
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability);
        expect(detachmentData.onDetach).toHaveBeenCalled();
    });
});
