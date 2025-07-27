import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RoleFormTemplate } from '.';

describe('<RoleFormTemplate /> component', () => {
    it('renders correctly', () => {
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <CreatorProvider>
                            <RoleFormTemplate state={state} />
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
