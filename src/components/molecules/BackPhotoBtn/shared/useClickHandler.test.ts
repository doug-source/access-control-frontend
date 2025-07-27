import { DispatchProvider } from '@/shared/providers/DispatchProvider';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, PropsWithChildren, useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { useClickHandler } from './useClickHandler';

const runRefHook = () => {
    return renderHook(() => {
        const inputRef = useRef<HTMLInputElement | null>(null);
        const input = {
            value: faker.word.noun(),
        } as unknown as HTMLInputElement;
        inputRef.current = input;
        return inputRef;
    });
};

describe('useClickHandler hook', () => {
    it('runs returning a callback correctly', () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children,
                        }),
                    }),
                }),
            });
        };
        const {
            result: { current: inputRef },
        } = runRefHook();
        const initialProps = { inputRef };
        const { result } = renderHook(
            ({ inputRef }) => {
                return useClickHandler(inputRef);
            },
            { initialProps, wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs executing the callback correctly', () => {
        const dispatch = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: createElement(DispatchProvider, {
                            dispatch,
                            children,
                        }),
                    }),
                }),
            });
        };
        const {
            result: { current: inputRef },
        } = runRefHook();
        const initialProps = { inputRef };
        const { result } = renderHook(
            ({ inputRef }) => {
                return useClickHandler(inputRef);
            },
            { initialProps, wrapper }
        );
        result.current();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'photo-chosen-change',
            payload: null,
        });
        expect(inputRef.current?.value).toBe('');
    });
});
