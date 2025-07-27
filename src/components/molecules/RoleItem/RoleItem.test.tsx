import { RemotionDataProvided } from '@/shared/contexts/types/RemotionDataProvided';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { Role } from '@/shared/types/Models/Role';
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
        const remotionData = { remotionConfirm: true, onRemove: vi.fn() };
        render(
            <MemoryRouter initialEntries={['/']}>
                <RemotionDataProvider {...remotionData}>
                    <ul>
                        <RoleItem role={role} />
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
                    <RemotionDataProvider {...remotionData}>
                        <ul>
                            <RoleItem role={role} />
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
