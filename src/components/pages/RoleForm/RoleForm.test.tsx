import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RoleForm } from '.';

describe('<RoleForm /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <CreatorProvider>
                            <RoleForm />
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
