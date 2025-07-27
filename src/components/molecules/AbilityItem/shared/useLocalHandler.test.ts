import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, MouseEvent, ReactNode } from 'react';
import { useLocalHandler } from './useLocalHandler';

type Children = {
    children: ReactNode;
};

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useLocalHandler hook', () => {
    it('runs correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onAttash = vi.fn();
            const dispatch = vi.fn();
            return createElement(RemotionDataProvider, {
                remotionConfirm: true,
                onRemove: async () => onAttash(),
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs calling first callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onAttash = vi.fn();
            const dispatch = vi.fn();
            return createElement(RemotionDataProvider, {
                remotionConfirm: true,
                onRemove: async () => onAttash(),
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler();
            },
            { wrapper }
        );
        const handler = result.current({
            id: faker.number.int(),
            name: faker.word.noun(),
        });
        expect(typeof handler).toBe('function');
    });
    it('runs calling remove action callback with remotionConfirm as true correctly', () => {
        const onAttash = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(RemotionDataProvider, {
                remotionConfirm: true,
                onRemove: async () => onAttash(),
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler();
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int(),
            name: faker.word.noun(),
        };
        const handler = result.current(ability);
        handler(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-remove',
            payload: ability,
        });
    });
    it('runs calling remove action callback with remotionConfirm as false correctly', () => {
        const onAttash = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(RemotionDataProvider, {
                remotionConfirm: false,
                onRemove: async () => onAttash(),
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler();
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int(),
            name: faker.word.noun(),
        };
        const handler = result.current(ability);
        handler(makeMouseEvent());
        expect(onAttash).toHaveBeenCalled();
    });
});
