import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ChangePassword } from '.';

describe('<ChangePassword /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <ChangePassword />
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
