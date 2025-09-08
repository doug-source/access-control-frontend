import { ResetPasswordState } from '@/shared/types/States';
import { resetPasswordInitialData } from '@/shared/utils/initialStates';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ChangePasswordTemplate } from '.';

describe('<ChangePasswordTemplate /> component', () => {
    it('renders correctly', () => {
        const password = faker.hacker.noun();
        const state: ResetPasswordState = {
            ...resetPasswordInitialData,
            token: faker.hacker.noun(),
            email: faker.internet.email(),
            fields: { password, passConfirm: password },
        };
        const formAction = vi.fn();
        const pending = false;
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <ChangePasswordTemplate
                        state={state}
                        formAction={formAction}
                        pending={pending}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
