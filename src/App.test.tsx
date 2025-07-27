import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { App } from './App';
import { AuthProvider } from './shared/providers/AuthProvider';
import { AuthUser } from './shared/types/NullableUser';

describe('main.tsx', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });
    it("renders with user's email verified correctly", () => {
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));
        const content = faker.word.noun();
        const rootContent = faker.word.noun();
        const router = createMemoryRouter(
            [
                {
                    element: (
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    ),
                    children: [
                        {
                            path: '/home',
                            element: <p>{rootContent}</p>,
                        },
                    ],
                },
                {
                    path: '/email/verify',
                    element: <p>{content}</p>,
                },
            ],
            {
                initialEntries: ['/home', '/email/verify'],
                initialIndex: 0,
            }
        );
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('paragraph');
        expect($el).toHaveTextContent(rootContent);
    });
    it("renders with user's email unverified correctly", () => {
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: false,
            name: faker.person.firstName(),
            token: faker.word.noun(),
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));
        const content = faker.word.noun();
        const router = createMemoryRouter(
            [
                {
                    path: '/',
                    element: (
                        <AuthProvider>
                            <App />
                        </AuthProvider>
                    ),
                },
                {
                    path: '/email/verify',
                    element: <p>{content}</p>,
                },
            ],
            {
                initialEntries: ['/', '/email/verify'],
                initialIndex: 0,
            }
        );
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('paragraph');
        expect($el).toHaveTextContent(content);
    });
});
