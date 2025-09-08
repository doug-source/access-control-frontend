import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { type MouseEvent } from 'react';
import { useRolesHandler } from './useRolesHandler';

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        HTMLButtonElement,
        globalThis.MouseEvent
    >;
};

describe('useRolesHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const { result } = renderHook(() => {
            return useRolesHandler();
        });
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
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
        const { result } = renderHook(() => {
            return useRolesHandler();
        });
        const user = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(user);
        eventHandler(makeMouseEvent());
        expect(onNavigate).toHaveBeenCalledWith(`/roles/user/${user.id}`);
    });
});
