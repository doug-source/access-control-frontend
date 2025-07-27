import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { UserConfig } from '.';

describe('<UserConfig /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <UserConfig />
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const element = screen.getByRole('form');
        expect(element).toBeInTheDocument();
    });
});
