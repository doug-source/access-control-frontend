import { HttpClientProvider } from '@/shared/providers/HttpClientProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { httpClientInstance } from '@/shared/utils/globals/generic';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RegisterPermissionTemplate } from '.';

describe('<RegisterPermissionTemplate /> component', () => {
    it('renders correctly', () => {
        const router = createMemoryRouter([
            {
                element: (
                    <HttpClientProvider client={httpClientInstance}>
                        <ViewerProvider />
                    </HttpClientProvider>
                ),
                children: [
                    {
                        path: '/',
                        element: (
                            <RegisterPermissionTemplate data-testid="box" />
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
