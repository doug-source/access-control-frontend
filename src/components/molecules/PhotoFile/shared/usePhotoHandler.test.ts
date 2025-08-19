import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type ChangeEvent, type PropsWithChildren } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { usePhotoHandler } from './usePhotoHandler';

const makeChangeEvent = <T>(target: { files?: { item(i: number): T } }) => {
    return { target } as unknown as ChangeEvent<HTMLInputElement>;
};

describe('usePhotoHandler hook', () => {
    it('runs returning a callback correctly', () => {
        const setFile = vi.fn();
        const {
            result: { current: handler },
        } = renderHook(() => {
            return usePhotoHandler(setFile);
        });
        expect(typeof handler).toBe('function');
    });
    it('runs with files as undefined correctly', () => {
        const setFile = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: children,
                    }),
                }),
            });
        };
        const {
            result: {
                current: { changeHandler: handler },
            },
        } = renderHook(
            () => {
                return usePhotoHandler(setFile);
            },
            { wrapper }
        );
        const evt = makeChangeEvent({});
        handler(evt);
    });
    it('runs with files as defined correctly', () => {
        const setFile = vi.fn();
        const wrapper = ({ children }: PropsWithChildren) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: children,
                    }),
                }),
            });
        };
        const {
            result: {
                current: { changeHandler: handler },
            },
        } = renderHook(
            () => {
                return usePhotoHandler(setFile);
            },
            { wrapper }
        );
        const mimetype = 'image/png';
        const file = new File(
            [faker.word.noun()],
            faker.system.commonFileName(mimetype),
            {
                type: mimetype,
            }
        );
        const evt = makeChangeEvent({
            files: {
                item() {
                    return file;
                },
            },
        });
        handler(evt);
    });
});
