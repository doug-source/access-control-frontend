import { CreatorProvider } from '@/shared/providers/CreatorProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { RegisterAccountState } from '@/shared/types/Reducers/Guest/RegisterAccount';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegisterAccountTemplate } from '.';

describe('<RegisterAccountTemplate /> component', () => {
    it('renders correctly', () => {
        const state: RegisterAccountState = {
            requestStatus: { statusCode: -1 },
            token: faker.hacker.noun(),
        };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <CreatorProvider>
                            <RegisterAccountTemplate state={state} />,
                        </CreatorProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
