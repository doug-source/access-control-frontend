import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ForgotPasswordHandlerProvider } from '@/shared/providers/guest/ForgotPasswordHandlerProvider';
import { State } from '@/shared/types/Reducers/Standard/State';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ForgotPasswordTemplate } from '.';

describe('<ForgotPasswordTemplate /> component', () => {
    it('renders correctly', () => {
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <ForgotPasswordHandlerProvider>
                            <ForgotPasswordTemplate state={state} />
                        </ForgotPasswordHandlerProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
