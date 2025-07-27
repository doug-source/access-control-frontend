import { type Ability } from '@/shared/types/Models/Ability';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router';
import { AbilityFromSubjectItem } from '.';

describe('<AbilityFromSubjectItem /> component', () => {
    it('renders correctly', () => {
        const ability: Ability = {
            id: 1,
            name: faker.word.noun(),
            createdAt: faker.date.anytime().toString(),
            updatedAt: faker.date.anytime().toString(),
        };
        render(
            <MemoryRouter initialEntries={['/']}>
                <ul>
                    <AbilityFromSubjectItem ability={ability} />
                </ul>
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
        const content = faker.word.noun();
        const router = createMemoryRouter([
            {
                path: '/abilities/:id',
                element: <h1>{content}</h1>,
            },
            {
                path: '/',
                element: (
                    <ul>
                        <AbilityFromSubjectItem ability={ability} />
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
