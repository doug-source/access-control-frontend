import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AbilityIndex } from '../types/Models/Ability';
import { useDataToRequest } from './useDataToRequest';

type Children = {
    children: ReactNode;
};

describe('useDataToRequest hook', () => {
    it('runs with id params undefined correctly', () => {
        const info = {
            label: faker.word.noun(),
            value: faker.word.noun(),
            data: {
                id: faker.number.int({ min: 1 }),
                name: faker.word.noun(),
            },
        };
        const wrapper = ({ children }: Children) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/', state: info }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/',
                        element: children,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useDataToRequest<
                    AbilityIndex,
                    `/api/roles/${number}/abilities`
                >((id) => `/api/roles/${id}/abilities`);
            },
            { wrapper }
        );
        expect(result.current[0]).toBe('/api/roles/0/abilities');
        expect(result.current[1]).toBe(info);
    });
    it('runs with id params defined correctly', () => {
        const info = {
            label: faker.word.noun(),
            value: faker.word.noun(),
            data: {
                id: faker.number.int({ min: 1 }),
                name: faker.word.noun(),
            },
        };
        const wrapper = ({ children }: Children) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: `/${info.data.id}`, state: info }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/:id',
                        element: children,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useDataToRequest<
                    AbilityIndex,
                    `/api/roles/${number}/abilities`
                >((id) => `/api/roles/${id}/abilities`);
            },
            { wrapper }
        );
        expect(result.current[0]).toBe(`/api/roles/${info.data.id}/abilities`);
        expect(result.current[1]).toBe(info);
    });
});
