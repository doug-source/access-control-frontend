import { RegisterPermission } from '@/shared/types/Models/RegisterPermission';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { RegisterPermissionItem } from '.';

describe('<RegisterPermissionItem /> component', () => {
    it('renders correctly', () => {
        const registerPermission: RegisterPermission = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
            phone: faker.phone.number(),
            expirationData: faker.date.anytime().toString(),
        };
        render(
            <MemoryRouter initialEntries={['/']}>
                <ul>
                    <RegisterPermissionItem
                        registerPermission={registerPermission}
                        data-testid="item"
                    />
                </ul>
            </MemoryRouter>
        );
        const $el = screen.getByTestId('item');
        expect($el).toBeInTheDocument();
    });
    it('renders moving between screens correctly', async () => {
        const registerPermission: RegisterPermission = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
            phone: faker.phone.number(),
            expirationData: faker.date.anytime().toString(),
        };
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/register-permissions/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <ul>
                        <RegisterPermissionItem
                            registerPermission={registerPermission}
                        />
                    </ul>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const user = userEvent.setup();
        const $el = screen.getByRole('listitem');
        await user.click($el);
        const $heading = screen.queryByRole('heading', { level: 1 });

        expect($heading).toHaveTextContent(content);
    });
});
