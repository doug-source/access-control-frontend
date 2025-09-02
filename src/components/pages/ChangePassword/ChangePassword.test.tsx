import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ChangePassword } from '.';

describe('<ChangePassword /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider client={httpClientInstance}>
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
