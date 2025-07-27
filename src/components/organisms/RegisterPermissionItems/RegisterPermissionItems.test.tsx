import { type RegisterPermissionIndex } from '@/shared/types/Models/RegisterPermission';
import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { RegisterPermissionItems } from '.';

describe('<RegisterPermissionItems /> component', () => {
    it('renders with empty items list correctly', async () => {
        const items: RegisterPermissionIndex[] = [];
        render(
            <MemoryRouter initialEntries={['/']}>
                <ul>
                    <RegisterPermissionItems items={items} />
                </ul>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el.children.length).toBe(1);
        const $item = await within($el).findByRole('listitem');
        expect($item).toHaveTextContent('Lista vazia');
    });
    it('renders filled items list correctly', async () => {
        const items: [RegisterPermissionIndex, RegisterPermissionIndex] = [
            { id: faker.number.int({ min: 1 }), email: faker.internet.email() },
            { id: faker.number.int({ min: 1 }), email: faker.internet.email() },
        ];
        render(
            <MemoryRouter initialEntries={['/']}>
                <ul>
                    <RegisterPermissionItems items={items} />
                </ul>
            </MemoryRouter>
        );
        const $el = screen.getByRole('list');
        expect($el.children.length).toBe(items.length);
        const $items = await within($el).findAllByRole('listitem');
        $items.forEach(($item, i) => {
            const [$div] = Array.from($item.children);
            expect($div.textContent).toBe(items[i].email);
        });
    });
});
