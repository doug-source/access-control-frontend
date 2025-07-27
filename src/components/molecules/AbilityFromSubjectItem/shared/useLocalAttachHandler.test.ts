import { AttachmentDataProvider } from '@/shared/providers/AttachmentDataProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { AbilityIndex } from '@/shared/types/Models/Ability';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, ReactNode } from 'react';
import { useLocalAttachHandler } from './useLocalAttachHandler';

type Children = {
    children: ReactNode;
};

describe('useLocalAttachHandler hook', () => {
    it('runs returning the callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onAttach = vi.fn();
            const dispatch = vi.fn();
            return createElement(AttachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                attachmentConfirm: true,
                onAttach: async () => onAttach(),
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
    it('runs with AttachmentData as null correctly', () => {
        const ability: AbilityIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const wrapper = ({ children }: Children) => {
            const dispatch = vi.fn();
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
        expect(typeof result.current(ability)).toBe('undefined');
    });
    it('runs with attachmentConfirm as true correctly', () => {
        const ability: AbilityIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const dispatch = vi.fn();
        const onAttach = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(AttachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                attachmentConfirm: true,
                onAttach: async () => onAttach(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalAttachHandler();
            },
            { wrapper }
        );
        result.current(ability);
        expect(dispatch).toHaveBeenCalled();
        expect(onAttach).not.toHaveBeenCalled();
    });
    it('runs with attachmentConfirm as false correctly', () => {
        const ability: AbilityIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const dispatch = vi.fn();
        const onAttach = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(AttachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                attachmentConfirm: false,
                onAttach: async () => onAttach(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalAttachHandler();
            },
            { wrapper }
        );
        result.current(ability);
        expect(dispatch).not.toHaveBeenCalled();
        expect(onAttach).toHaveBeenCalled();
    });
});
