import type { LoginState } from '@/shared/types/States';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { LoginTemplate } from '.';
import styles from './LoginTemplate.module.scss';

describe('<LoginTemplate /> component', () => {
    it('renders correctly', () => {
        const state: LoginState = {
            requestStatus: { statusCode: -1 },
            fields: { email: '', password: '' },
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <LoginTemplate
                        state={state}
                        formAction={formAction}
                        pending={false}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
    it('renders with status code equal 200 correctly', () => {
        const state: LoginState = {
            requestStatus: { statusCode: 200, message: 'OK' },
            fields: { email: '', password: '' },
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <LoginTemplate
                        state={state}
                        formAction={formAction}
                        pending={false}
                        data-testid="container"
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByTestId('container');
        expect($el).toHaveClass(styles.logged);
    });
    it('renders with login already provided correctly', () => {
        const formAction = vi.fn();
        const state: LoginState = {
            requestStatus: { statusCode: -1 },
            fields: { email: '', password: '' },
        };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <LoginTemplate
                        state={state}
                        formAction={formAction}
                        pending={false}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.queryByRole('form');
        expect($el).not.toBeInTheDocument();
    });
});
