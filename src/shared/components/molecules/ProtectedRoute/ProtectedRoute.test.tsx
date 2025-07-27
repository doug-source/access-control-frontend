import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ProtectedRoute } from '.';

describe('<ProtectedRoute /> component', () => {
    it('renders correctly', () => {
        const rootContent = faker.word.noun();
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/home',
                element: <p>{content}</p>,
            },
            {
                element: <ProtectedRoute allowed={true} redirectPath="/home" />,
                children: [
                    {
                        path: '/',
                        element: <p>{rootContent}</p>,
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('paragraph');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(rootContent);
    });
    it('renders applying the redirect correctly', () => {
        window.localStorage.clear();
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/home',
                element: <p>{content}</p>,
            },
            {
                element: (
                    <ProtectedRoute allowed={false} redirectPath="/home" />
                ),
                children: [
                    {
                        path: '/',
                        element: <div>Root</div>,
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('paragraph');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(content);
    });
});
