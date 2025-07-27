import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AttachmentDataProvider } from '../providers/AttachmentDataProvider';
import { DispatchProvider } from '../providers/DispatchProvider';
import { useAbilityLocalAttachHandler } from './useAbilityLocalAttachHandler';

describe('useAbilityLocalAttachHandler hook', () => {
    it("renders hook's returns correctly", () => {
        const attachmentData = { attachmentConfirm: true, onAttach: vi.fn() };
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(AttachmentDataProvider, {
                                children,
                                ...attachmentData,
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
                return useAbilityLocalAttachHandler();
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
                return useAbilityLocalAttachHandler();
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
        const attachmentData = { attachmentConfirm: true, onAttach: vi.fn() };
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(AttachmentDataProvider, {
                                children,
                                ...attachmentData,
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
                return useAbilityLocalAttachHandler();
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability);
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-attach',
            payload: ability,
        });
    });
    it('renders when attachmentConfirm equals false correctly', () => {
        const attachmentData = { attachmentConfirm: false, onAttach: vi.fn() };
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children: createElement(AttachmentDataProvider, {
                                children,
                                ...attachmentData,
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
                return useAbilityLocalAttachHandler();
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability);
        expect(attachmentData.onAttach).toHaveBeenCalled();
    });
});
