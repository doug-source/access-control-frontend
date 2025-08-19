import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RequestAccount } from '.';

describe('<RequestAccount /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                path: '/',
                element: <RequestAccount />,
            },
        ]);
        render(<RouterProvider router={router} />);
        const $els = screen.getAllByRole('generic');
        expect($els[0]).toBeInTheDocument();
    });
});
