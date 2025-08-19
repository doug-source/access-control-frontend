import { RemotionDataProvided } from '@/shared/contexts/types/RemotionDataProvided';
import { AuthProvider } from '@/shared/providers/AuthProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { UserIndex } from '@/shared/types/Models/User';
import { AuthUser } from '@/shared/types/NullableUser';
import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { UserItem } from '.';
import styles from './UserItem.module.scss';

describe('<UserItem /> component', () => {
    it('renders correctly', () => {
        const userIndex: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        const remotionData = { remotionConfirm: true, onRemove: vi.fn() };
        render(
            <MemoryRouter initialEntries={['/']}>
                <RemotionDataProvider {...remotionData}>
                    <ul>
                        <UserItem user={userIndex} />
                    </ul>
                </RemotionDataProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
    it('renders change the current page clicking on the row correctly', async () => {
        const remotionData: RemotionDataProvided = {
            remotionConfirm: true,
            onRemove: vi.fn(),
        };
        const userIndex: UserIndex = {
            id: faker.number.int({ min: 1 }),
            name: faker.person.firstName(),
        };
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/users/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <RemotionDataProvider {...remotionData}>
                        <ul>
                            <UserItem user={userIndex} />
                        </ul>
                    </RemotionDataProvider>
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
    it('renders with current user signed correctly', async () => {
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
            phone: null,
            photo: null,
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));

        const remotionData: RemotionDataProvided = {
            remotionConfirm: true,
            onRemove: vi.fn(),
        };
        const userIndex: UserIndex = {
            id: Number(userSigned.id),
            name: userSigned.name,
        };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <AuthProvider>
                        <RemotionDataProvider {...remotionData}>
                            <ul>
                                <UserItem user={userIndex} />
                            </ul>
                        </RemotionDataProvider>
                    </AuthProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('listitem');
        const $btn = within($el).getByRole('button', {
            name: /Botão para remover o usuário/,
        });
        expect($btn).toHaveClass(styles.trashDisabled);
    });
});
