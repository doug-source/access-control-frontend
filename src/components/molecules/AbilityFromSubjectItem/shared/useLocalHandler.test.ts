import { AttachmentDataProvider } from '@/shared/providers/AttachmentDataProvider';
import { DetachmentDataProvider } from '@/shared/providers/DetachmentDataProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
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

describe('useLocalAttachHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onAttash = vi.fn();
            const onDetash = vi.fn();
            const dispatch = vi.fn();
            return createElement(DetachmentDataProvider, {
                detachmentConfirm: true,
                onDetach: () => onDetash(),
                children: createElement(AttachmentDataProvider, {
                    attachmentConfirm: true,
                    onAttach: async () => onAttash(),
                    children: createElement(DispatchProvider, {
                        children,
                        dispatch,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler('/abilities');
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onAttash = vi.fn();
            const onDetash = vi.fn();
            const dispatch = vi.fn();
            return createElement(DetachmentDataProvider, {
                detachmentConfirm: true,
                onDetach: () => onDetash(),
                children: createElement(AttachmentDataProvider, {
                    attachmentConfirm: true,
                    onAttach: async () => onAttash(),
                    children: createElement(DispatchProvider, {
                        children,
                        dispatch,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler('/abilities');
            },
            { wrapper }
        );
        expect(
            typeof result.current({
                id: faker.number.int({ min: 1 }),
                name: faker.word.noun(),
            })
        ).toBe('function');
    });
    it('runs calling detach action callback correctly', () => {
        const onAttash = vi.fn();
        const onDetash = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                detachmentConfirm: true,
                onDetach: () => onDetash(),
                children: createElement(AttachmentDataProvider, {
                    attachmentConfirm: true,
                    onAttach: async () => onAttash(),
                    children: createElement(DispatchProvider, {
                        children,
                        dispatch,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler('/abilities');
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability)(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-detach',
            payload: ability,
        });
    });
    it('runs calling attach handler callback correctly', () => {
        const onAttash = vi.fn();
        const onDetash = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                detachmentConfirm: true,
                onDetach: () => onDetash(),
                children: createElement(AttachmentDataProvider, {
                    attachmentConfirm: true,
                    onAttach: async () => onAttash(),
                    children: createElement(DispatchProvider, {
                        children,
                        dispatch,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalHandler(`/abilities/user/${1}/attach`);
            },
            { wrapper }
        );
        const ability = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        result.current(ability)(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-attach',
            payload: ability,
        });
    });
});
