import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ScreenWrapper } from '.';

describe('<ScreenWrapper /> component', () => {
    it('renders correctly', () => {
        window.scrollTo = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <div>
                        <ScreenWrapper title={faker.word.noun()}>
                            content
                        </ScreenWrapper>
                    </div>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
    });
});
