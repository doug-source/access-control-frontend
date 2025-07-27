import { ApprovementDataProvided } from '@/shared/contexts/types/ApprovementDataProvided';
import { RemotionDataProvided } from '@/shared/contexts/types/RemotionDataProvided';
import { ApprovementDataProvider } from '@/shared/providers/ApprovementDataProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { type RegisterRequestIndex } from '@/shared/types/Models/RegisterRequest';
import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { RegisterRequestItems } from '.';

describe('<RegisterRequestItems /> component', () => {
    it('renders with empty items list correctly', async () => {
        const items: RegisterRequestIndex[] = [];
        render(
            <ul>
                <RegisterRequestItems items={items} />
            </ul>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
        expect($el.children.length).toBe(1);
        const $item = await within($el).findByRole('listitem');
        expect($item).toHaveTextContent('Lista vazia');
    });
    it('renders with no empty items list correctly', async () => {
        const approvementData: ApprovementDataProvided = {
            approvementConfirm: true,
            onApprove: vi.fn(),
        };
        const remotionData: RemotionDataProvided = {
            remotionConfirm: true,
            onRemove: vi.fn(),
        };
        const itemsData: RegisterRequestIndex[] = [
            { id: faker.number.int({ min: 1 }), email: faker.internet.email() },
            { id: faker.number.int({ min: 1 }), email: faker.internet.email() },
        ];
        render(
            <MemoryRouter initialEntries={['/']}>
                <RemotionDataProvider {...remotionData}>
                    <ApprovementDataProvider {...approvementData}>
                        <ul>
                            <RegisterRequestItems items={itemsData} />
                        </ul>
                    </ApprovementDataProvider>
                </RemotionDataProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
        expect($el.children.length).toBe(2);
        const items = within($el).getAllByRole('listitem');
        items.forEach(($item, i) =>
            expect($item).toHaveTextContent(itemsData[i].email)
        );
    });
    it('renders change the page by click on the row correctly', async () => {
        const approvementData: ApprovementDataProvided = {
            approvementConfirm: true,
            onApprove: vi.fn(),
        };
        const remotionData: RemotionDataProvided = {
            remotionConfirm: true,
            onRemove: vi.fn(),
        };
        const itemsData: RegisterRequestIndex[] = [
            { id: faker.number.int({ min: 1 }), email: faker.internet.email() },
            { id: faker.number.int({ min: 1 }), email: faker.internet.email() },
        ];
        const content = faker.word.noun();

        const router = createMemoryRouter([
            {
                path: '/register-requests/:id',
                element: <div>{content}</div>,
            },
            {
                path: '/',
                element: (
                    <RemotionDataProvider {...remotionData}>
                        <ApprovementDataProvider {...approvementData}>
                            <ul>
                                <RegisterRequestItems items={itemsData} />
                            </ul>
                        </ApprovementDataProvider>
                    </RemotionDataProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const [$firstItem] = screen.getAllByRole('listitem');
        const user = userEvent.setup();

        await user.click($firstItem);
        const $el = screen.getByText(content);
        expect($el).toBeInTheDocument();
    });
});
