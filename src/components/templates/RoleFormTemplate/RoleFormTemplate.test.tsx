import type { RoleFormState } from '@/shared/types/States';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RoleFormTemplate } from '.';

describe('<RoleFormTemplate /> component', () => {
    it('renders correctly', () => {
        const state: RoleFormState = {
            requestStatus: { statusCode: -1 },
            fields: { name: '' },
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <RoleFormTemplate
                        state={state}
                        formAction={formAction}
                        pending={false}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
