import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { Role } from '@/shared/types/Models/Role';
import { type RoleState } from '@/shared/types/Reducers/Role';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RoleTemplate } from '.';

describe('<RoleTemplate /> component', () => {
    it('renders correctly', () => {
        const role: Role = {
            id: faker.number.int({ min: 1 }),
            name: faker.word.noun(),
            createdAt: faker.date.anytime.toString(),
            updatedAt: faker.date.anytime.toString(),
        };
        const state: RoleState = { requestStatus: { statusCode: -1 }, role };
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
                            <RoleTemplate state={state} data-testid="box" />
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
