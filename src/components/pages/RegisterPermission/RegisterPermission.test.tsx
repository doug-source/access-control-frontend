import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegisterPermission } from '.';

describe('<RegisterPermission /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                element: (
                    <HttpClientProvider>
                        <ViewerProvider />
                    </HttpClientProvider>
                ),
                children: [
                    {
                        path: '/',
                        element: <RegisterPermission />,
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $els = screen.getAllByRole('generic');
        expect($els[0]).toBeInTheDocument();
    });
});
