import { DetachmentDataProvider } from '@/shared/providers/DetachmentDataProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type MouseEvent, type ReactNode } from 'react';
import { useLocalDetachHandler } from './useLocalDetachHandler';

type Children = {
    children: ReactNode;
};

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useLocalDetachHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch: vi.fn(),
                }),
                detachmentConfirm: true,
                onDetach: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch: vi.fn(),
                }),
                detachmentConfirm: true,
                onDetach: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        const output = result.current({
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        });
        expect(typeof output).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DispatchProvider, {
                children,
                dispatch,
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        const handler = result.current({
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        });
        handler(makeMouseEvent());
        expect(dispatch).not.toHaveBeenCalled();
    });
    it('runs triggering the attachment with detachmentConfirm as true correctly', () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                detachmentConfirm: true,
                onDetach: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        const role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(role);
        eventHandler(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-detach',
            payload: role,
        });
    });
    it('runs triggering the attachment with detachmentConfirm as false correctly', () => {
        const dispatch = vi.fn();
        const onDetach = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                detachmentConfirm: false,
                onDetach,
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        const role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(role);
        eventHandler(makeMouseEvent());
        expect(onDetach).toHaveBeenCalled();
    });
});
