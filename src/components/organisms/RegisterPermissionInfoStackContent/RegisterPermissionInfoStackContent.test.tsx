import { type RegisterPermission } from '@/shared/types/Models/RegisterPermission';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { RegisterPermissionInfoStackContent } from '.';

describe('<RegisterPermissionInfoStackContent /> component', () => {
    it('renders with phone correctly', () => {
        const registerPermission: RegisterPermission = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            expirationData: faker.date.anytime.toString(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        render(
            <div data-testid="block">
                <RegisterPermissionInfoStackContent
                    registerPermission={registerPermission}
                />
            </div>
        );
        const $el = screen.getByTestId('block');
        expect($el).toBeInTheDocument();
        const $phoneNullable = screen.queryByText('-');
        expect($phoneNullable).not.toBeInTheDocument();
    });
    it('renders no phone correctly', () => {
        const registerPermission: RegisterPermission = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: null,
            expirationData: faker.date.anytime.toString(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        render(
            <div data-testid="block">
                <RegisterPermissionInfoStackContent
                    registerPermission={registerPermission}
                />
            </div>
        );
        const $phoneNullable = screen.getByText('-');
        expect($phoneNullable).toBeInTheDocument();
    });
});
