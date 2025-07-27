import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ForgotPasswordHandlerProvider } from '@/shared/providers/guest/ForgotPasswordHandlerProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ForgotPassword } from '.';

describe('<ForgotPassword /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <ForgotPasswordHandlerProvider>
                            <ForgotPassword />
                        </ForgotPasswordHandlerProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
