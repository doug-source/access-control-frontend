import * as LocalNavigateHooks from '@/shared/hooks/useLocalNavigate';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { type MouseEvent } from 'react';
import { MockInstance } from 'vitest';
import { useRolesHandler } from './useRolesHandler';

type LocalLocationReturn = ReturnType<
    typeof LocalNavigateHooks.useLocalNavigate
>;

let localNavigateSpy: MockInstance<() => LocalLocationReturn>;

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useRolesHandler hook', () => {
    beforeAll(() => {
        localNavigateSpy = vi.spyOn(LocalNavigateHooks, 'useLocalNavigate');
    });
    afterAll(() => {
        localNavigateSpy.mockRestore();
    });
    beforeEach(() => {
        localNavigateSpy.mockReset();
    });
    it('runs returning the first callback correctly', () => {
        localNavigateSpy.mockReturnValue(function () {});
        const { result } = renderHook(() => {
            return useRolesHandler();
        });
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        localNavigateSpy.mockReturnValue(function () {});
        const { result } = renderHook(() => {
            return useRolesHandler();
        });
        const callback = result.current({
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        });
        expect(typeof callback).toBe('function');
    });
    it('runs triggering the event correctly', () => {
        const onNavigate = vi.fn();
        localNavigateSpy.mockReturnValue(function (...args: unknown[]) {
            onNavigate(...args);
        });
        const { result } = renderHook(() => {
            return useRolesHandler();
        });
        const user = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(user);
        eventHandler(makeMouseEvent());
        expect(onNavigate).toHaveBeenCalledWith(`/roles/user/${user.id}`, {
            state: {
                label: 'Propriedade (usuário)',
                value: user.name,
                data: user,
            },
        });
    });
});
