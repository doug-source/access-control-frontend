import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AbilityTemplate } from '.';

describe('<AbilityTemplate /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <AbilityTemplate data-testid="element" />,
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByTestId('element');
        expect($el).toBeInTheDocument();
    });
});
