import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type MouseEvent, type PropsWithChildren } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { type MockInstance } from 'vitest';
import { useToAbilityRouteHandler } from './useToAbilityRouteHandler';

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

const makeMouseEvent = () => {
    return { stopPropagation() {} } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useToAbilityRouteHandler hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    beforeEach(() => {
        localNavigateSpy.mockReset();
    });
    it("renders with hook's returns correctly", () => {
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
                    },
                ],
                { initialEntries: ['/'], initialIndex: 0 }
            );
            return createElement(RouterProvider, {
                router,
            });
        };
        const { result } = renderHook(
            () => {
                return useToAbilityRouteHandler({
                    endpoint: 'user',
                    label: faker.word.noun(),
                    makeValue: vi.fn(() => faker.word.noun()),
                });
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
        expect(
            typeof result.current({ id: faker.number.int({ min: 1 }) })
        ).toBe('function');
    });
    it('renders triggering the mouse event into user context correctly', () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const wrapper = ({ children }: PropsWithChildren) => {
            const router = createMemoryRouter(
                [
                    {
                        path: '/',
                        element: children,
                    },
                ],
                { initialEntries: ['/'], initialIndex: 0 }
            );
            return createElement(RouterProvider, {
                router,
            });
        };
        const label = faker.word.noun();
        const user = { id: faker.number.int({ min: 1 }) };
        const makeValue = vi.fn((data: typeof user) => `${data.id}`);
        const { result } = renderHook(
            () => {
                return useToAbilityRouteHandler({
                    endpoint: 'user',
                    label,
                    makeValue,
                });
            },
            { wrapper }
        );
        const handler = result.current(user);
        handler(makeMouseEvent());
        expect(onNavigate).toHaveBeenCalledWith(`/abilities/user/${user.id}`, {
            state: {
                label,
                value: `${user.id}`,
                data: user,
            },
        });
    });
});
