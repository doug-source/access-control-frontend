import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import type { AbilityFormState } from '@/shared/types/States';
import { httpClientInstance } from '@/shared/utils/globals/generic';
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
                    <HttpClientProvider client={httpClientInstance}>
                        <CreatorProvider>
                            <AbilityFormTemplate
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
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
});
