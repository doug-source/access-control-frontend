import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ResetPasswordHandlerProvider } from '@/shared/providers/guest/ResetPasswordHandlerProvider';
import { ResetPasswordState } from '@/shared/types/Reducers/Guest/ChangePassword';
import { resetPasswordInitialData } from '@/shared/utils/ReduceInitialValues';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ChangePasswordTemplate } from '.';

describe('<ChangePasswordTemplate /> component', () => {
    it('renders correctly', () => {
        const state: ResetPasswordState = {
            ...resetPasswordInitialData,
            token: faker.hacker.noun(),
            email: faker.internet.email(),
        };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <ResetPasswordHandlerProvider>
                            <ChangePasswordTemplate state={state} />
                        </ResetPasswordHandlerProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);

        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
