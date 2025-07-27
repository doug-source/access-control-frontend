import { AttachmentDataProvider } from '@/shared/providers/AttachmentDataProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type MouseEvent, type ReactNode } from 'react';
import { useLocalAttachHandler } from './useLocalAttachHandler';

type Children = {
    children: ReactNode;
};

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useLocalAttachHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            return createElement(AttachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch: vi.fn(),
                }),
                attachmentConfirm: true,
                onAttach: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalAttachHandler();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            return createElement(AttachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch: vi.fn(),
                }),
                attachmentConfirm: true,
                onAttach: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalAttachHandler();
            },
            { wrapper }
        );
        const output = result.current({
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        });
        expect(typeof output).toBe('function');
    });
    it('runs with attachmentData equal null correctly', () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DispatchProvider, {
                children,
                dispatch,
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalAttachHandler();
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
    it('runs triggering the attachment with attachmentConfirm as true correctly', () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(AttachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                attachmentConfirm: true,
                onAttach: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalAttachHandler();
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
            type: 'to-attach',
            payload: role,
        });
    });
    it('runs triggering the attachment with attachmentConfirm as false correctly', () => {
        const dispatch = vi.fn();
        const onAttach = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(AttachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                attachmentConfirm: false,
                onAttach,
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalAttachHandler();
            },
            { wrapper }
        );
        const role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const eventHandler = result.current(role);
        eventHandler(makeMouseEvent());
        expect(onAttach).toHaveBeenCalled();
    });
});
