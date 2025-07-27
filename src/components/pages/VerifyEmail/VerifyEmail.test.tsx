import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { VerifyEmailRequesterProvider } from '@/shared/providers/VerifyEmailRequesterProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { VerifyEmail } from '.';

describe('<VerifyEmail /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <VerifyEmailRequesterProvider>
                            <VerifyEmail />
                        </VerifyEmailRequesterProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $els = screen.getAllByRole('generic');
        expect($els[0]).toBeInTheDocument();
    });
});
