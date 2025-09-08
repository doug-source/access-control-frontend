import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { UserConfig } from '.';

describe('<UserConfig /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <UserConfig />,
            },
        ]);
        render(<RouterProvider router={router} />);
        const element = screen.getByRole('form');
        expect(element).toBeInTheDocument();
    });
});
