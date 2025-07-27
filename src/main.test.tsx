import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { routeList } from './shared/routes';

const router = createBrowserRouter(routeList);

describe('main.tsx', () => {
    it('renders correctly', async () => {
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
