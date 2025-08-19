import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { forgotPasswordBase } from '@/shared/utils/globals/forgotPassword';
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
                        <LogicBaseProvider base={forgotPasswordBase}>
                            <ForgotPassword />
                        </LogicBaseProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
