import type { AbilityIndex } from '@/shared/types/Models/Ability';
import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import type { ComponentPropsWithRef } from 'react';
import { ListItems } from '.';

const Item = ({
    data,
}: ComponentPropsWithRef<ComponentPropsWithRef<typeof ListItems>['item']>) => (
    <li>{data.id}</li>
);

describe('<ListItems /> component', () => {
    it('renders empty correctly', async () => {
        const items: AbilityIndex[] = [];
        render(
            <ul>
                <ListItems items={items} item={Item} />
            </ul>
        );
        const $el = screen.getByRole('list');
        expect($el).toBeInTheDocument();
        expect($el.children.length).toBe(1);
        const $item = await within($el).findByRole('listitem');
        expect($item).toHaveTextContent('Lista vazia');
    });
    it('renders no empty correctly', async () => {
        const items: AbilityIndex[] = [
            { id: faker.number.int({ min: 1 }), name: faker.word.noun() },
            { id: faker.number.int({ min: 1 }), name: faker.word.noun() },
        ];
        render(
            <ul>
                <ListItems items={items} item={Item} />
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
