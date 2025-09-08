import type { Role } from '@/shared/types/Models/Role';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { RoleItem } from '.';

describe('<RoleItem /> component', () => {
    it('renders correctly', () => {
        const role: Role = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        render(
            <MemoryRouter initialEntries={['/']}>
                <ul>
                    <RoleItem data={role} />
                </ul>
            </MemoryRouter>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
    it('renders change the current page clicking on the row correctly', async () => {
        const role: Role = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/roles/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <ul>
                        <RoleItem data={role} />
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
