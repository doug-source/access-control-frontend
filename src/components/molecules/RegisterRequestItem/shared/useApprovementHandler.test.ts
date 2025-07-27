import { ApprovementDataProvider } from '@/shared/providers/ApprovementDataProvider';
import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, MouseEvent, ReactNode } from 'react';
import { useApprovementHandler } from './useApprovementHandler';

type Children = {
    children: ReactNode;
};

const makeMouseEvent = () => {
    return { stopPropagation: vi.fn() } as unknown as MouseEvent<
        SVGSVGElement,
        globalThis.MouseEvent
    >;
};

describe('useApprovementHandler hook', () => {
    it('runs returning the first callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onApprove = vi.fn();
            const dispatch = vi.fn();
            return createElement(ApprovementDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                approvementConfirm: true,
                onApprove: async () => onApprove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useApprovementHandler();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs returning the second callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            const onApprove = vi.fn();
            const dispatch = vi.fn();
            return createElement(ApprovementDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                approvementConfirm: true,
                onApprove: async () => onApprove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useApprovementHandler();
            },
            { wrapper }
        );
        const output = result.current({
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
        });
        expect(typeof output).toBe('function');
    });
    it('runs triggering the approvement with approvementConfirm as true correctly', () => {
        const onApprove = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(ApprovementDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                approvementConfirm: true,
                onApprove: async () => onApprove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useApprovementHandler();
            },
            { wrapper }
        );
        const registerRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
        };
        const eventHandler = result.current(registerRequest);
        eventHandler(makeMouseEvent());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'to-approve',
            payload: registerRequest,
        });
    });
    it('runs triggering the approvement with approvementConfirm as false correctly', () => {
        const onApprove = vi.fn();
        const dispatch = vi.fn();
        const wrapper = ({ children }: Children) => {
            return createElement(ApprovementDataProvider, {
                children: createElement(DispatchProvider, {
                    children,
                    dispatch,
                }),
                approvementConfirm: false,
                onApprove: async () => onApprove(),
            });
        };
        const { result } = renderHook(
            () => {
                return useApprovementHandler();
            },
            { wrapper }
        );
        const registerRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
        };
        const eventHandler = result.current(registerRequest);
        eventHandler(makeMouseEvent());
        expect(onApprove).toHaveBeenCalled();
    });
});
