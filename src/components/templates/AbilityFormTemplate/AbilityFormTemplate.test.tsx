import type { AbilityFormState } from '@/shared/types/States';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AbilityFormTemplate } from '.';

describe('<AbilityFormTemplate /> component', () => {
    it('renders correctly', () => {
        const state: AbilityFormState = {
            requestStatus: { statusCode: -1 },
            fields: { name: '' },
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <AbilityFormTemplate
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
