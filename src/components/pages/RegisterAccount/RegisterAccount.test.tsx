import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegisterAccount } from '.';

describe('<RegisterAccount /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <CreatorProvider>
                            <RegisterAccount />
                        </CreatorProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
