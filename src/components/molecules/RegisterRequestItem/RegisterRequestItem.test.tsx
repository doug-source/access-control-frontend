import { ApprovementDataProvider } from '@/shared/providers/ApprovementDataProvider';
import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { RegisterRequest } from '@/shared/types/Models/RegisterRequest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { RegisterRequestItem } from '.';

describe('<RegisterRequestItem /> component', () => {
    it('renders correctly', () => {
        const registerRequest: RegisterRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        const remotionData = { remotionConfirm: true, onRemove: vi.fn() };
        const approvementData = {
            approvementConfirm: true,
            onApprove: vi.fn(),
        };
        render(
            <MemoryRouter initialEntries={['/']}>
                <ApprovementDataProvider {...approvementData}>
                    <RemotionDataProvider {...remotionData}>
                        <ul>
                            <RegisterRequestItem
                                registerRequest={registerRequest}
                            />
                        </ul>
                    </RemotionDataProvider>
                </ApprovementDataProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
    it('renders change the current page clicking on the row correctly', async () => {
        const registerRequest: RegisterRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        const remotionData = { remotionConfirm: true, onRemove: vi.fn() };
        const approvementData = {
            approvementConfirm: true,
            onApprove: vi.fn(),
        };
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/register-requests/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <ApprovementDataProvider {...approvementData}>
                        <RemotionDataProvider {...remotionData}>
                            <ul>
                                <RegisterRequestItem
                                    registerRequest={registerRequest}
                                />
                            </ul>
                        </RemotionDataProvider>
                    </ApprovementDataProvider>
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
