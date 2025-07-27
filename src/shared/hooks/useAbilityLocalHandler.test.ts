import { renderHook } from '@testing-library/react';
import { createElement, MouseEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { MockInstance } from 'vitest';
import { AbilityIndex } from '../types/Models/Ability';
import { useAbilityLocalHandler } from './useAbilityLocalHandler';

import { faker } from '@faker-js/faker';
import * as AbilityLocalAttachHandlerHooks from './useAbilityLocalAttachHandler';
import * as AbilityLocalDetachHandlerHooks from './useAbilityLocalDetachHandler';

let AbilityLocalAttachHandlerSpy: MockInstance<
    () => (ability: AbilityIndex) => void
>;
let AbilityLocalDetachHandlerSpy: MockInstance<
    () => (ability: AbilityIndex) => void
>;

const makeMouseEvent = () => {
    return { stopPropagation() {} } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useAbilityLocalHandler hook', () => {
    beforeAll(() => {
        AbilityLocalAttachHandlerSpy = vi.spyOn(
            AbilityLocalAttachHandlerHooks,
            'useAbilityLocalAttachHandler'
        );
        AbilityLocalDetachHandlerSpy = vi.spyOn(
            AbilityLocalDetachHandlerHooks,
            'useAbilityLocalDetachHandler'
        );
    });
    afterAll(() => {
        AbilityLocalAttachHandlerSpy.mockRestore();
        AbilityLocalDetachHandlerSpy.mockRestore();
    });
    beforeEach(() => {
        AbilityLocalAttachHandlerSpy.mockReset();
        AbilityLocalDetachHandlerSpy.mockReset();
    });
    it("renders hook's returns correctly", () => {
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
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
                return useAbilityLocalHandler('/abilities');
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it("renders hook's second callback returned correctly", () => {
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
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
                return useAbilityLocalHandler('/abilities');
            },
            { wrapper }
        );
        expect(
            typeof result.current({
                id: faker.number.int({ min: 1 }),
                name: faker.word.noun(),
            })
        ).toBe('function');
    });
    it('renders triggering event on dettach context correctly', () => {
        const onAttach = vi.fn();
        AbilityLocalAttachHandlerSpy.mockReturnValue(
            (ability: AbilityIndex) => {
                onAttach(ability);
            }
        );
        const onDetach = vi.fn();
        AbilityLocalDetachHandlerSpy.mockReturnValue(
            (ability: AbilityIndex) => {
                onDetach(ability);
            }
        );
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/abilities',
                        element: children,
                        HydrateFallback: () => null,
                    },
                ],
                {
                    initialEntries: [{ pathname: '/abilities' }],
                    initialIndex: 0,
                }
            );

            return createElement(RouterProvider, {
                router,
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityLocalHandler(
                    `/abilities/user/${faker.number.int({ min: 1 })}`
                );
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability)(makeMouseEvent());
        expect(onAttach).not.toHaveBeenCalled();
        expect(onDetach).toHaveBeenCalledWith(ability);
    });
    it('renders triggering event on attach context correctly', () => {
        const onAttach = vi.fn();
        AbilityLocalAttachHandlerSpy.mockReturnValue(
            (ability: AbilityIndex) => {
                onAttach(ability);
            }
        );
        const onDetach = vi.fn();
        AbilityLocalDetachHandlerSpy.mockReturnValue(
            (ability: AbilityIndex) => {
                onDetach(ability);
            }
        );
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/abilities',
                        element: children,
                        HydrateFallback: () => null,
                    },
                ],
                {
                    initialEntries: [{ pathname: '/abilities' }],
                    initialIndex: 0,
                }
            );
            return createElement(RouterProvider, {
                router,
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityLocalHandler(
                    `/abilities/user/${faker.number.int({ min: 1 })}/attach`
                );
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability)(makeMouseEvent());
        expect(onDetach).not.toHaveBeenCalled();
        expect(onAttach).toHaveBeenCalledWith(ability);
    });
});
