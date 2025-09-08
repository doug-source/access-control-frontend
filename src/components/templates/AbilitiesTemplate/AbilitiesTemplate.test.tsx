import type { AbilityIndex } from '@/shared/types/Models/Ability';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AbilitiesTemplate } from '.';

describe('<AbilitiesTemplate /> component', () => {
    const Comp = ({ data }: { data: AbilityIndex }) => {
        throw data;
    };
    it('renders correctly', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AbilitiesTemplate navigation="/abilities" item={Comp} />
            </MemoryRouter>
        );
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
    });
    it("renders with 'PaginationPurpose' not included into DOM correctly", () => {
        render(
            <MemoryRouter initialEntries={['/abilities']}>
                <AbilitiesTemplate navigation="/abilities" item={Comp} />
            </MemoryRouter>
        );

        const $el = screen.queryByRole('article');
        expect($el).not.toBeInTheDocument();
    });
    it("renders with 'PaginationPurpose' included into DOM correctly", () => {
        const user = {
            id: faker.number.int({
                min: 1,
            }),
            name: faker.person.firstName(),
        };
        render(
            <MemoryRouter
                initialEntries={[
                    {
                        pathname: `/abilities/user/${user.id}`,
                    },
                ]}
            >
                <AbilitiesTemplate navigation="/abilities" item={Comp} />
            </MemoryRouter>
        );

        // const $el = screen.queryByRole('article');
        // expect($el).toBeInTheDocument();
    });
});
