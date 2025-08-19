import { AuthProvider } from '@/shared/providers/AuthProvider';
import { AuthUser } from '@/shared/types/NullableUser';
import { faker } from '@faker-js/faker';
import { renderHook } from '@testing-library/react';
import { createElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { useMakeUserChecking } from './useMakeUserChecking';

type Children = {
    children: ReactNode;
};

describe('useMakeUserChecking hook', () => {
    afterEach(() => {
        window.localStorage.clear();
    });
    it('runs returning a callback correctly', () => {
        const wrapper = ({ children }: Children) => {
            return createElement(MemoryRouter, {
                initialEntries: ['/'],
                children: createElement(AuthProvider, {
                    children,
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useMakeUserChecking();
            },
            { wrapper }
        );
        expect(typeof result.current).toBe('function');
    });
    it('runs executing callback returned correctly', () => {
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
            phone: null,
            photo: null,
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));
        const wrapper = ({ children }: Children) => {
            return createElement(MemoryRouter, {
                initialEntries: ['/'],
                children: createElement(AuthProvider, {
                    children,
                }),
            });
        };
        const { result } = renderHook(
            () => {
                return useMakeUserChecking();
            },
            { wrapper }
        );
        const isSameUser = result.current({
            id: Number(userSigned.id),
            name: userSigned.name,
        });
        expect(isSameUser).toBe(true);
    });
});
