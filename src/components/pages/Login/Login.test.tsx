import { AuthenticatorProvider } from '@/shared/providers/boxes/AuthenticatorProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Login } from '.';

describe('<Login /> component', () => {
    it('renders login page correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <AuthenticatorProvider>
                        <Login />
                    </AuthenticatorProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
