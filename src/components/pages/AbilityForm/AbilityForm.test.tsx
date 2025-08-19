import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AbilityForm } from '.';

describe('<AbilityForm /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <CreatorProvider>
                            <AbilityForm />
                        </CreatorProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
