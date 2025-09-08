import type { RequestAccountState } from '@/shared/types/States';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RequestAccountTemplate } from '.';

describe('<RequestAccountTemplate /> component', () => {
    it('renders correctly', () => {
        const state: RequestAccountState = {
            requestStatus: { statusCode: -1 },
            fields: { email: '', phone: '' },
        };
        const formData = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <RequestAccountTemplate
                        state={state}
                        formAction={formData}
                        pending={false}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
