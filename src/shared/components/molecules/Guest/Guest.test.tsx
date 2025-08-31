import { AuthUser } from '@/shared/types/NullableUser';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Guest } from '.';

describe('<Guest /> component', () => {
    it('renders with user already signed correctly', () => {
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
        const content = faker.word.noun();
        const rootContent = faker.word.noun();
        const router = createMemoryRouter([
            {
                element: <Guest />,
                children: [
                    {
                        path: '/',
                        element: <p>{rootContent}</p>,
                    },
                ],
            },
            {
                path: '/home',
                element: <p>{content}</p>,
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('paragraph');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(content);
    });
    it('renders no user already signed correctly', () => {
        window.localStorage.clear();
        const content = faker.word.noun();
        const rootContent = faker.word.noun();
        const router = createMemoryRouter([
            {
                element: <Guest />,
                children: [
                    {
                        path: '/',
                        element: <p>Guest: {rootContent}</p>,
                    },
                ],
            },
            {
                path: '/home',
                element: <p>Home: {content}</p>,
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('paragraph');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(rootContent);
    });
});
