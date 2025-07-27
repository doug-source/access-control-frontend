import { type LocationStateBetweenScreen } from '@/shared/types/LocationStateBetweenScreen';
import { type RoleIndex } from '@/shared/types/Models/Role';
import { type UserIndex } from '@/shared/types/Models/User';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { useAbilityEndpoints } from './useAbilityEndpoints';

type Children = {
    children: ReactNode;
};

describe('useAbilityEndpoints hook', () => {
    it('runs with /abilities route correctly', () => {
        const wrapper = ({ children }: Children) => {
            return createElement(MemoryRouter, {
                initialEntries: [{ pathname: '/abilities' }],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/abilities',
                        element: children,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityEndpoints();
            },
            { wrapper }
        );
        const endpoint = '/api/abilities';
        expect(result.current[0]).toBe(endpoint);
        expect(result.current[1]).toBe(endpoint);
    });
    it('runs with /abilities/user route correctly', () => {
        const info: LocationStateBetweenScreen<UserIndex> = {
            label: faker.word.noun(),
            value: faker.word.noun(),
            data: {
                id: faker.number.int({ min: 1 }),
                name: faker.word.noun(),
            },
        };
        const wrapper = ({ children }: Children) => {
            return createElement(MemoryRouter, {
                initialEntries: [
                    {
                        pathname: `/abilities/user/${info.data.id}`,
                        state: info,
                    },
                ],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/abilities/user/:id',
                        element: children,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityEndpoints();
            },
            { wrapper }
        );
        expect(result.current[0]).toBe(`/api/users/${info.data.id}/abilities`);
        expect(result.current[1]).toBe('/api/abilities');
        expect(result.current[2]).toBe(info);
    });
    it('runs with /abilities/role route correctly', () => {
        const info: LocationStateBetweenScreen<RoleIndex> = {
            label: faker.word.noun(),
            value: faker.word.noun(),
            data: {
                id: faker.number.int({ min: 1 }),
                name: faker.word.noun(),
            },
        };
        const wrapper = ({ children }: Children) => {
            return createElement(MemoryRouter, {
                initialEntries: [
                    {
                        pathname: `/abilities/role/${info.data.id}`,
                        state: info,
                    },
                ],
                initialIndex: 0,
                children: createElement(Routes, {
                    children: createElement(Route, {
                        path: '/abilities/role/:id',
                        element: children,
                    }),
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useAbilityEndpoints();
            },
            { wrapper }
        );
        expect(result.current[0]).toBe(`/api/roles/${info.data.id}/abilities`);
        expect(result.current[1]).toBe('/api/abilities');
        expect(result.current[2]).toBe(info);
    });
});
