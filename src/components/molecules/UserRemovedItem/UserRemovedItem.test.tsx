import { RemotionDataProvided } from '@/shared/contexts/types/RemotionDataProvided';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { RestorationDataProvider } from '@/shared/providers/RestorationDataProvider';
import { UserIndex } from '@/shared/types/Models/User';
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
        const remotionData = {
            remotionConfirm: true,
            onRemove: vi.fn(),
        };
        const restorationData = {
            restorationConfirm: true,
            onRestore: vi.fn(),
        };
        render(
            <MemoryRouter initialEntries={['/']}>
                <RemotionDataProvider {...remotionData}>
                    <RestorationDataProvider {...restorationData}>
                        <ul>
                            <UserRemovedItem user={userIndex} />
                        </ul>
                    </RestorationDataProvider>
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
                path: '/users/removed/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <RemotionDataProvider {...remotionData}>
                        <ul>
                            <UserRemovedItem user={userIndex} />
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
});
