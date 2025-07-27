import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { RegisterPermission } from '@/shared/types/Models/RegisterPermission';
import { RegisterPermissionState } from '@/shared/types/Reducers/RegisterPermission';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegisterPermissionTemplate } from '.';

describe('<RegisterPermissionTemplate /> component', () => {
    it('renders correctly', () => {
        const registerPermission: RegisterPermission = {
            id: faker.number.int({ min: 1 }),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            expirationData: faker.date.anytime.toString(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        const state: RegisterPermissionState = {
            requestStatus: { statusCode: -1 },
            registerPermission: registerPermission,
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
                            <RegisterPermissionTemplate
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
