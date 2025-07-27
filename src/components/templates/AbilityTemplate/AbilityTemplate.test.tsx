import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { AbilityState } from '@/shared/types/Reducers/Ability';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { AbilityTemplate } from '.';

describe('<AbilityTemplate /> component', () => {
    it('renders correctly', () => {
        const state: AbilityState = {
            ability: {
                id: faker.number.int({ min: 1 }),
                name: faker.word.noun(),
                createdAt: faker.date.anytime().toString(),
                updatedAt: faker.date.anytime().toString(),
            },
            requestStatus: { statusCode: -1 },
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
                            <AbilityTemplate
                                state={state}
                                data-testid="element"
                            />
                        ),
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByTestId('element');
        expect($el).toBeInTheDocument();
    });
});
