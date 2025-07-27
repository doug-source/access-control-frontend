import { Role } from '@/shared/types/Models/Role';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { RoleInfoStackContent } from '.';

describe('<RoleInfoStackContent /> component', () => {
    it('renders correctly', () => {
        const role: Role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        render(
            <div data-testid="box">
                <RoleInfoStackContent roleInstance={role} />
            </div>
        );
        const $el = screen.getByTestId('box');
        expect($el).toBeInTheDocument();
    });
});
