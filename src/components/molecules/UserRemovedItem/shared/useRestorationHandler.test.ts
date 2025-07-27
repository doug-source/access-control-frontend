import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { RestorationDataProvider } from '@/shared/providers/RestorationDataProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type MouseEvent, type ReactNode } from 'react';
import { useRestorationHandler } from './useRestorationHandler';

type Children = {
    children: ReactNode;
};

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useRestorationHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onRestore = vi.fn();
            const dispatch = vi.fn();
            return createElement(RestorationDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                restorationConfirm: true,
                onRestore: async () => onRestore(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRestorationHandler();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onRestore = vi.fn();
            const dispatch = vi.fn();
            return createElement(RestorationDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                restorationConfirm: true,
                onRestore: async () => onRestore(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRestorationHandler();
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
        const onRestore = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(RestorationDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                restorationConfirm: true,
                onRestore: async () => onRestore(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRestorationHandler();
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
            type: 'to-restore',
            payload: user,
        });
    });
    it('runs triggering the remotion with restorationConfirm as false correctly', () => {
        const onRestore = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(RestorationDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                restorationConfirm: false,
                onRestore: async () => onRestore(),
            });
        };
        const { result } = renderHook(
            () => {
                return useRestorationHandler();
            },
            { wrapper }
        );
        const user = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(user);
        eventHandler(makeMouseEvent());
        expect(onRestore).toHaveBeenCalled();
    });
});
