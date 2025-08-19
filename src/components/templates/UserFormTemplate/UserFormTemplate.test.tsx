import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import type { UserFormState } from '@/shared/types/States';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { UserFormTemplate } from '.';

describe('<UserFormTemplate /> component', () => {
    it('renders correctly', () => {
        const state: UserFormState = {
            requestStatus: { statusCode: -1 },
            fields: { email: '', name: '', password: '' },
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <CreatorProvider>
                            <UserFormTemplate
                                state={state}
                                formAction={formAction}
                                pending={false}
                            />
                        </CreatorProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
