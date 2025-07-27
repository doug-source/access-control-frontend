import { type RegisterRequest } from '@/shared/types/Models/RegisterRequest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { RegisterRequestInfoStackContent } from '.';

describe('<RegisterRequestInfoStackContent /> component', () => {
    it('renders with phone correctly', () => {
        const registerRequest: RegisterRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        render(
            <div data-testid="block">
                <RegisterRequestInfoStackContent
                    registerRequest={registerRequest}
                />
            </div>
        );
        const $el = screen.getByTestId('block');
        expect($el).toBeInTheDocument();
        const $phoneNullable = screen.queryByText('-');
        expect($phoneNullable).not.toBeInTheDocument();
    });
    it('renders no phone correctly', () => {
        const registerRequest: RegisterRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: null,
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        render(
            <div data-testid="block">
                <RegisterRequestInfoStackContent
                    registerRequest={registerRequest}
                />
            </div>
        );
        const $phoneNullable = screen.getByText('-');
        expect($phoneNullable).toBeInTheDocument();
    });
});
