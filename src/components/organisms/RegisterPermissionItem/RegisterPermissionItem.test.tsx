import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { RegisterPermissionItem } from '.';

describe('<RegisterPermissionItem /> component', () => {
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <ul>
                    <RegisterPermissionItem
                        data-testid="item"
                        data={{
                            email: faker.internet.email(),
                            id: faker.number.int({ min: 1 }),
                        }}
                    />
                </ul>
            </MemoryRouter>
        );
        const $el = screen.getByTestId('item');
        expect($el).toBeInTheDocument();
    });
    it('renders moving between screens correctly', async () => {
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
                            data={{
                                email: faker.internet.email(),
                                id: faker.number.int({ min: 1 }),
                            }}
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
