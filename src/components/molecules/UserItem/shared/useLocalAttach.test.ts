import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { MouseEvent } from 'react';
import { useLocalAttach } from './useLocalAttach';

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        HTMLButtonElement,
        globalThis.MouseEvent
    >;
};

describe('useLocalAttach hook', () => {
    it('runs returning the first callback correctly', () => {
        const { result } = renderHook(() => {
            return useLocalAttach(
                {
                    id: faker.number.int({ min: 1 }),
                    name: faker.word.noun(),
                },
                vi.fn()
            );
        });
        expect(typeof result.current).toBe('function');
    });
    it('runs triggering the mouse event correctly', () => {
        const user = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const dispatch = vi.fn();
        const { result } = renderHook(() => {
            return useLocalAttach(user, dispatch);
        });
        result.current(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-attach',
            payload: user,
        });
    });
});
