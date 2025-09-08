import type { UserIndex } from '@/shared/types/Models/User';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { UserRemovedItem } from '.';

describe('<UserRemovedItem /> component', () => {
    it('renders correctly', () => {
        const userIndex: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        render(
            <MemoryRouter initialEntries={['/']}>
                <ul>
                    <UserRemovedItem data={userIndex} />
                </ul>
            </MemoryRouter>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
    it('renders change the current page clicking on the row correctly', async () => {
        const userIndex: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/users/removed/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <ul>
                        <UserRemovedItem data={userIndex} />
                    </ul>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('listitem');
        const user = userEvent.setup();
        await user.click($el);
        const $content = screen.getByText(content);
        expect($content).toBeInTheDocument();
    });
});
