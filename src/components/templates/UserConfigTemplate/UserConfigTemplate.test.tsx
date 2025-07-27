import { userConfigInitialData } from '@/shared/utils/ReduceInitialValues';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { UserConfigTemplate } from '.';

describe('<UserConfigTemplate /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <UserConfigTemplate
                        state={userConfigInitialData}
                        data-testid="comp-key"
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const element = screen.getByTestId('comp-key');
        expect(element).toBeInTheDocument();
    });
});
