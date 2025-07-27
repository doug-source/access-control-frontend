import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type MouseEvent, type ReactNode } from 'react';
import { useRemotionHandler } from './useRemotionHandler';

type Children = {
    children: ReactNode;
};

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useRemotionHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onRemove = vi.fn();
            const dispatch = vi.fn();
            return createElement(RemotionDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                remotionConfirm: true,
                onRemove: async () => onRemove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRemotionHandler();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onRemove = vi.fn();
            const dispatch = vi.fn();
            return createElement(RemotionDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                remotionConfirm: true,
                onRemove: async () => onRemove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRemotionHandler();
            },
            { wrapper }
        );
        const callback = result.current({
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        });
        expect(typeof callback).toBe('function');
    });
    it('runs triggering the remotion when the users are the same correctly', () => {
        const onRemove = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(RemotionDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                remotionConfirm: true,
                onRemove: async () => onRemove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRemotionHandler();
            },
            { wrapper }
        );
        const user = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(user);
        eventHandler(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-remove',
            payload: user,
        });
    });
    it('runs triggering the remotion with remotionConfirm as false correctly', () => {
        const onRemove = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(RemotionDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                remotionConfirm: false,
                onRemove: async () => onRemove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRemotionHandler();
            },
            { wrapper }
        );
        const user = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(user);
        eventHandler(makeMouseEvent());
        expect(onRemove).toHaveBeenCalled();
    });
});
