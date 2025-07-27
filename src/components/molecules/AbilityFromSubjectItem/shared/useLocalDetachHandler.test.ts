import { DetachmentDataProvider } from '@/shared/providers/DetachmentDataProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { AbilityIndex } from '@/shared/types/Models/Ability';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, ReactNode } from 'react';
import { useLocalDetachHandler } from './useLocalDetachHandler';

type Children = {
    children: ReactNode;
};

describe('useLocalDetachHandler hook', () => {
    it('runs returning the callback correctly', () => {
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
    it('runs with DetachmentData as null correctly', () => {
        const ability: AbilityIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const wrapper = ({ children }: Children) => {
            return createElement(DispatchProvider, {
                children,
                dispatch: vi.fn(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        expect(typeof result.current(ability)).toBe('undefined');
    });
    it('runs with detachmentConfirm as true correctly', () => {
        const ability: AbilityIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const dispatch = vi.fn();
        const onDetash = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                detachmentConfirm: true,
                onDetach: async () => onDetash(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        result.current(ability);
        expect(dispatch).toHaveBeenCalled();
        expect(onDetash).not.toHaveBeenCalled();
    });
    it('runs with detachmentConfirm as false correctly', () => {
        const ability: AbilityIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
        };
        const dispatch = vi.fn();
        const onDetash = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(DetachmentDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                detachmentConfirm: false,
                onDetach: async () => onDetash(),
            });
        };
        const { result } = renderHook(
            () => {
                return useLocalDetachHandler();
            },
            { wrapper }
        );
        result.current(ability);
        expect(dispatch).not.toHaveBeenCalled();
        expect(onDetash).toHaveBeenCalled();
    });
});
