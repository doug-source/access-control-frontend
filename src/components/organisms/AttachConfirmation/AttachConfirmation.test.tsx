import { UserIndex } from '@/shared/types/Models/User';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { AttachConfirmation } from '.';

describe('<AttachConfirmation /> component', () => {
    it('renders correctly', () => {
        const user: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        const onClose = vi.fn();
        render(
            <MemoryRouter initialEntries={['/']}>
                <AttachConfirmation
                    user={user}
                    idToAttach={1}
                    onClose={onClose}
                />
            </MemoryRouter>
        );
        const $el = screen.getByRole('heading', { level: 2 });
        expect($el).toBeInTheDocument();
    });
    it('renders with idToAttach nullable correctly', () => {
        const user: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        const onClose = vi.fn();
        render(
            <MemoryRouter initialEntries={['/']}>
                <AttachConfirmation
                    user={user}
                    idToAttach={null}
                    onClose={onClose}
                />
            </MemoryRouter>
        );
        const $el = screen.queryByRole('dialog');
        expect($el).not.toBeInTheDocument();
    });
    it('renders with user nullable correctly', () => {
        const onClose = vi.fn();
        render(
            <MemoryRouter initialEntries={['/']}>
                <AttachConfirmation
                    user={null}
                    idToAttach={0}
                    onClose={onClose}
                />
            </MemoryRouter>
        );
        const $el = screen.queryByRole('dialog');
        expect($el).not.toBeInTheDocument();
    });
    it("renders redirecting to user's role attaching correctly", async () => {
        const user: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        const idToAttach = user.id;
        const router = createMemoryRouter([
            {
                path: `/roles/user/${idToAttach}/attach`,
                element: <p>Role viewed</p>,
            },
            {
                path: '/',
                element: (
                    <AttachConfirmation
                        user={user}
                        idToAttach={idToAttach}
                        onClose={vi.fn()}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const $btn = screen.getByRole('button', { name: 'Papel' });
        const userView = userEvent.setup();
        await userView.click($btn);
        const $paragraph = screen.getByRole('paragraph');
        expect($paragraph).toBeInTheDocument();
        expect($paragraph).toHaveTextContent('Role viewed');
    });
    it("renders redirecting to user's ability attaching correctly", async () => {
        const user: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        const idToAttach = user.id;
        const router = createMemoryRouter([
            {
                path: `/abilities/user/${idToAttach}/attach`,
                element: <p>Ability viewed</p>,
            },
            {
                path: '/',
                element: (
                    <AttachConfirmation
                        user={user}
                        idToAttach={idToAttach}
                        onClose={vi.fn()}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const $btn = screen.getByRole('button', { name: 'Habilidade' });
        const userView = userEvent.setup();
        await userView.click($btn);
        const $paragraph = screen.getByRole('paragraph');
        expect($paragraph).toBeInTheDocument();
        expect($paragraph).toHaveTextContent('Ability viewed');
    });
});
