import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Ability } from '.';

describe('<Ability /> component', () => {
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
                        element: <Ability />,
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $els = screen.getAllByRole('generic');
        $els.forEach(($el) => expect($el).toBeInTheDocument());
    });
});
