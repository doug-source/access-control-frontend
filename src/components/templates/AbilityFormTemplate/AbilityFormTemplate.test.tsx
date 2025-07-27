import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { State } from '@/shared/types/Reducers/Standard/State';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AbilityFormTemplate } from '.';

describe('<AbilityFormTemplate /> component', () => {
    it('renders correctly', () => {
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <CreatorProvider>
                            <AbilityFormTemplate state={state} />
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
