import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { NotFoundTemplate } from '.';

describe('<NotFoundTemplate /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <NotFoundTemplate />
            </MemoryRouter>
        );
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
    it('renders changing the screen to root page correctly', async () => {
        const content = faker.word.noun();
        const router = createMemoryRouter(
            [
                {
                    path: '/',
                    element: <p>{content}</p>,
                },
                {
                    path: '/not-found',
                    element: <NotFoundTemplate />,
                },
            ],
            { initialEntries: ['/', '/not-found'], initialIndex: 1 }
        );
        render(<RouterProvider router={router} />);
        const $btn = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($btn);
        const $paragraph = screen.getByRole('paragraph');
        expect($paragraph).toHaveTextContent(content);
    });
});
