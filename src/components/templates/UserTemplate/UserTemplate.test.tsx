import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { User } from '@/shared/types/Models/User';
import { UserState } from '@/shared/types/Reducers/User';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { UserTemplate } from '.';

describe('<UserTemplate /> component', () => {
    it('renders correctly', () => {
        const user: User = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
            deletedAt: null,
            email: faker.internet.email(),
            emailVerifiedAt: faker.date.anytime.toString(),
            phone: faker.phone.number(),
        };
        const state: UserState = { requestStatus: { statusCode: -1 }, user };
        const router = createMemoryRouter([
            {
                element: (
                    <HttpClientProvider>
                        <ViewerProvider />
                    </HttpClientProvider>
                ),
                children: [
                    {
                        path: '/',
                        element: (
                            <UserTemplate
                                state={state}
                                removed={false}
                                data-testid="box"
                            />
                        ),
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByTestId('box');
        expect($el).toBeInTheDocument();
    });
});
