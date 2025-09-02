import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Role } from '.';

describe('<Role /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                element: (
                    <HttpClientProvider client={httpClientInstance}>
                        <ViewerProvider />
                    </HttpClientProvider>
                ),
                children: [
                    {
                        path: '/',
                        element: <Role />,
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $els = screen.getAllByRole('generic');
        expect($els[0]).toBeInTheDocument();
    });
});
