import { makeRouteList } from '@/shared/routes';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter(makeRouteList(faker.word.noun()));

describe('main.tsx', () => {
    it('renders correctly', async () => {
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
});
