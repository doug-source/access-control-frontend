import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import type { ForgotPasswordState } from '@/shared/types/States';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ForgotPasswordTemplate } from '.';

describe('<ForgotPasswordTemplate /> component', () => {
    it('renders correctly', () => {
        const state: ForgotPasswordState = {
            requestStatus: { statusCode: -1 },
            fields: { email: '' },
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <ForgotPasswordTemplate
                            state={state}
                            formAction={formAction}
                            pending={false}
                        />
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
