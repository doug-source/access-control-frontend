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
                    <LogicBaseProvider base={forgotPasswordBase}>
                        <ForgotPassword />
                    </LogicBaseProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
