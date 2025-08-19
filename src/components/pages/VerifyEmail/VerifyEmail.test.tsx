import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { LogicBaseProvider } from '@/shared/providers/LogicBaseProvider';
import { verifyEmailBase } from '@/shared/utils/globals/verifyEmail';
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
                        <LogicBaseProvider base={verifyEmailBase}>
                            <VerifyEmail />
                        </LogicBaseProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $els = screen.getAllByRole('generic');
        expect($els[0]).toBeInTheDocument();
    });
});
