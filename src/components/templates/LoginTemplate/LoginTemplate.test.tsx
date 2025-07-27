import { AuthenticatorProvider } from '@/shared/providers/boxes/AuthenticatorProvider';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { MockInstance } from 'vitest';
import { LoginTemplate } from '.';
import styles from './LoginTemplate.module.scss';
import * as loginProvided from './shared/useLoginProvided';

let loginProvidedSpy: MockInstance<() => readonly [boolean]>;

describe('<LoginTemplate /> component', () => {
    beforeAll(() => {
        loginProvidedSpy = vi.spyOn(loginProvided, 'useLoginProvided');
    });
    afterAll(() => {
        loginProvidedSpy.mockRestore();
    });
    it('renders correctly', () => {
        loginProvidedSpy.mockReturnValue([false]);
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <AuthenticatorProvider>
                        <LoginTemplate state={state} />
                    </AuthenticatorProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
    it('renders with status code equal 200 correctly', () => {
        loginProvidedSpy.mockReturnValue([false]);
        const state: State = {
            requestStatus: { statusCode: 200, message: 'OK' },
        };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <AuthenticatorProvider>
                        <LoginTemplate state={state} data-testid="container" />
                    </AuthenticatorProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByTestId('container');
        expect($el).toHaveClass(styles.logged);
    });
    it('renders with login already provided correctly', () => {
        loginProvidedSpy.mockReturnValue([true]);
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <AuthenticatorProvider>
                        <LoginTemplate state={state} />
                    </AuthenticatorProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.queryByRole('form');
        expect($el).not.toBeInTheDocument();
    });
});
