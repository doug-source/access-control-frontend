import { RegisterAccountState } from '@/shared/types/States';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegisterAccountTemplate } from '.';

describe('<RegisterAccountTemplate /> component', () => {
    it('renders correctly', () => {
        const state: RegisterAccountState = {
            requestStatus: { statusCode: -1 },
            token: faker.hacker.noun(),
            fields: { email: '', name: '', passConfirm: '', password: '' },
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <RegisterAccountTemplate
                        state={state}
                        formAction={formAction}
                        pending={false}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
