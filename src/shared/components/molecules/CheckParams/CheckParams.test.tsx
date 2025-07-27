import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router';
import { CheckParams } from '.';

describe('<CheckParams /> component', () => {
    it('renders correctly', () => {
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/',
                element: <Navigate to="/users/3" />,
            },
            {
                element: <CheckParams />,
                children: [
                    {
                        path: '/users/:id',
                        element: <p>{content}</p>,
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('paragraph');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(content);
    });
    it('renders with invalid type param correctly', () => {
        const content = faker.word.noun();
        const notFoundContent = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/',
                element: <Navigate to="/users/foo" />,
            },
            {
                element: <CheckParams id={/^\d+$/} />,
                children: [
                    {
                        path: '/users/:id',
                        element: <p>{content}</p>,
                    },
                ],
            },
            {
                path: '/not-found',
                element: <p>{notFoundContent}</p>,
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('paragraph');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(notFoundContent);
    });
    it('renders with param not provided correctly', () => {
        const content = faker.word.noun();
        const notFoundContent = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/',
                element: <Navigate to="/users/1/" />,
            },
            {
                element: <CheckParams id={/^\d+$/} marker={/^[ab]+$/} />,
                children: [
                    {
                        path: '/users/:id',
                        element: <p>{content}</p>,
                    },
                ],
            },
            {
                path: '/not-found',
                element: <p>{notFoundContent}</p>,
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('paragraph');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(notFoundContent);
    });
});
