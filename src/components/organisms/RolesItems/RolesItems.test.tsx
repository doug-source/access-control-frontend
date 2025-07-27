import { RoleIndex } from '@/shared/types/Models/Role';
import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import { RolesItems } from '.';

const Item = ({ role }: { role: RoleIndex }) => <li>{role.id}</li>;

describe('<RolesItems /> component', () => {
    it('renders empty list correctly', async () => {
        const items: RoleIndex[] = [];
        render(
            <ul>
                <RolesItems items={items} item={Item} />
            </ul>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
        expect($el.children.length).toBe(1);
        const $item = await within($el).findByRole('listitem');
        expect($item).toHaveTextContent('Lista vazia');
    });
    it('renders no empty list correctly', async () => {
        const items: RoleIndex[] = [
            {
                id: faker.number.int({ min: 1 }),
                name: faker.person.firstName(),
            },
            {
                id: faker.number.int({ min: 1 }),
                name: faker.person.firstName(),
            },
        ];
        render(
            <ul>
                <RolesItems items={items} item={Item} />
            </ul>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
        expect($el.children.length).toBe(2);

        const $items = await within($el).findAllByRole('listitem');
        $items.forEach(($item, i) =>
            expect($item).toHaveTextContent(`${items[i].id}`)
        );
    });
});
