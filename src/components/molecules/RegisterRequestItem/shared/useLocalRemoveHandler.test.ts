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
        const registerRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
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
                return useLocalRemoveHandler(registerRequest, vi.fn());
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs triggering the remotion with remotionConfirm as true correctly', () => {
        const registerRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
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
                return useLocalRemoveHandler(registerRequest, dispatch);
            },
            { wrapper }
        );
        result.current(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-remove',
            payload: registerRequest,
        });
    });
    it('runs triggering the remotion with remotionConfirm as false correctly', () => {
        const registerRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
        };
        const onRemove = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(RemotionDataProvider, {
                children,
                remotionConfirm: false,
                onRemove,
            });
        };
        const dispatch = vi.fn();
        const { result } = renderHook(
            () => {
                return useLocalRemoveHandler(registerRequest, dispatch);
            },
            { wrapper }
        );
        result.current(makeMouseEvent());
        expect(onRemove).toHaveBeenCalled();
    });
});
