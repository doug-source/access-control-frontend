import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ResetPasswordHandlerProvider } from '@/shared/providers/guest/ResetPasswordHandlerProvider';
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
                        <ResetPasswordHandlerProvider>
                            <ChangePassword />
                        </ResetPasswordHandlerProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
