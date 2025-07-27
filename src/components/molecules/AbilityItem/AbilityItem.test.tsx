import { RemotionDataProvider } from '@/shared/providers/RemotionDataProvider';
import { type Ability } from '@/shared/types/Models/Ability';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { AbilityItem } from '.';

describe('<AbilityItem /> component', () => {
    it('renders correctly', () => {
        const ability: Ability = {
            id: 1,
            name: faker.word.noun(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        const onRemove = vi.fn();
        render(
            <MemoryRouter initialEntries={['/']}>
                <RemotionDataProvider
                    remotionConfirm={true}
                    onRemove={onRemove}
                >
                    <ul>
                        <AbilityItem ability={ability} />
                    </ul>
                </RemotionDataProvider>
            </MemoryRouter>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
    it('renders moving between screens correctly', async () => {
        const ability: Ability = {
            id: 1,
            name: faker.word.noun(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        const onRemove = vi.fn();
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/abilities/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <RemotionDataProvider
                        remotionConfirm={true}
                        onRemove={onRemove}
                    >
                        <ul>
                            <AbilityItem ability={ability} />
                        </ul>
                    </RemotionDataProvider>
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
