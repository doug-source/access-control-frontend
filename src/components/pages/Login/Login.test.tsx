import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { loginBase } from '@/shared/utils/globals/login';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Login } from '.';

describe('<Login /> component', () => {
    it('renders login page correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <LogicBaseProvider base={loginBase}>
                        <Login />
                    </LogicBaseProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
