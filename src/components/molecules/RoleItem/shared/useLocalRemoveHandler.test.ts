import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, MouseEvent, ReactNode } from 'react';
import { useLocalRemoveHandler } from './useLocalRemoveHandler';

type Children = {
    children: ReactNode;
};

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useLocalRemoveHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const wrapper = ({ children }: Children) => {
            return createElement(RemotionDataProvider, {
                children,
                remotionConfirm: true,
                onRemove: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalRemoveHandler(role, vi.fn());
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs triggering the remotion correctly', () => {
        const role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const wrapper = ({ children }: Children) => {
            return createElement(RemotionDataProvider, {
                children,
                remotionConfirm: true,
                onRemove: vi.fn(),
            });
        };
        const dispatch = vi.fn();
        const { result } = renderHook(
            () => {
                return useLocalRemoveHandler(role, dispatch);
            },
            { wrapper }
        );
        result.current(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-remove',
            payload: role,
        });
    });
});
