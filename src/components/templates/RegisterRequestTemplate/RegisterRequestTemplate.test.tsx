import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { RegisterRequest } from '@/shared/types/Models/RegisterRequest';
import { RegisterRequestState } from '@/shared/types/Reducers/RegisterRequest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegisterRequestTemplate } from '.';

describe('<RegisterRequestTemplate /> component', () => {
    it('renders correctly', () => {
        const registerRequest: RegisterRequest = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        const state: RegisterRequestState = {
            requestStatus: { statusCode: -1 },
            registerRequest: registerRequest,
        };
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
                            <RegisterRequestTemplate
                                state={state}
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
