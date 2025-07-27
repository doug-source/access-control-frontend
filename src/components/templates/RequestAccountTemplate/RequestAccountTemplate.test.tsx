import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { RegisterRequestMakerProvider } from '@/shared/providers/guest/RegisterRequestMakerProvider';
import { ViewerProvider } from '@/shared/providers/ViewerProvider';
import { State } from '@/shared/types/Reducers/Standard/State';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { RequestAccountTemplate } from '.';

describe('<RequestAccountTemplate /> component', () => {
    it('renders correctly', () => {
        const state: State = { requestStatus: { statusCode: -1 } };
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
                            <RegisterRequestMakerProvider>
                                <RequestAccountTemplate state={state} />,
                            </RegisterRequestMakerProvider>
                        ),
                    },
                ],
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
