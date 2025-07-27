import { AuthProvider } from '@/shared/providers/AuthProvider';
import { HttpClientProvider } from '@/shared/providers/boxes/HttpClientProvider';
import { VerifyEmailRequesterProvider } from '@/shared/providers/VerifyEmailRequesterProvider';
import { AuthUser } from '@/shared/types/NullableUser';
import { type State } from '@/shared/types/Reducers/Standard/State';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { MockInstance } from 'vitest';
import { VerifyEmailTemplate } from '.';
import * as useVerifyEmailHook from './shared/useVerifyEmailVerification';

let verifyEmailSpy: MockInstance<() => readonly [boolean]>;

describe('<VerifyEmailTemplate /> component', () => {
    beforeAll(() => {
        verifyEmailSpy = vi.spyOn(
            useVerifyEmailHook,
            'useVerifyEmailVerification'
        );
    });
    afterAll(() => {
        verifyEmailSpy.mockRestore();
    });
    it('renders correctly', () => {
        verifyEmailSpy.mockReturnValue([false]);
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <VerifyEmailRequesterProvider>
                            <VerifyEmailTemplate state={state} />,
                        </VerifyEmailRequesterProvider>
                    </HttpClientProvider>
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
    it("renders with email already verified by auth's user's status correctly", () => {
        verifyEmailSpy.mockReturnValue([false]);
        const userSigned: AuthUser = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));
        const content = faker.word.noun();
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <HttpClientProvider>
                        <AuthProvider>
                            <VerifyEmailRequesterProvider>
                                <VerifyEmailTemplate state={state} />,
                            </VerifyEmailRequesterProvider>
                        </AuthProvider>
                    </HttpClientProvider>
                ),
            },
            {
                path: '/home',
                element: <p>{content}</p>,
            },
        ]);
        render(<RouterProvider router={router} />);
        const $paragraph = screen.getByRole('paragraph');
        expect($paragraph).toHaveTextContent(content);
    });
    it('renders with email already verified by request checking', () => {
        verifyEmailSpy.mockReturnValue([true]);
        const content = faker.word.noun();
        const state: State = { requestStatus: { statusCode: -1 } };
        const router = createMemoryRouter(
            [
                {
                    path: '/',
                    element: (
                        <HttpClientProvider>
                            <VerifyEmailRequesterProvider>
                                <VerifyEmailTemplate state={state} />,
                            </VerifyEmailRequesterProvider>
                        </HttpClientProvider>
                    ),
                },
                {
                    path: '/home',
                    element: <p>{content}</p>,
                },
            ],
            { initialEntries: ['/', '/home'], initialIndex: 0 }
        );
        render(<RouterProvider router={router} />);
        const $paragraph = screen.getByRole('paragraph');
        expect($paragraph).toHaveTextContent(content);
    });
    it('renders requesting email verification', () => {
        verifyEmailSpy.mockReturnValue([false]);
        const state: State = { requestStatus: { statusCode: -1 } };
        const id = faker.number.int().toString();
        const hash = faker.word.noun();
        const router = createMemoryRouter(
            [
                {
                    path: '/verify/:id/:hash',
                    element: (
                        <HttpClientProvider>
                            <VerifyEmailRequesterProvider>
                                <VerifyEmailTemplate state={state} />
                            </VerifyEmailRequesterProvider>
                        </HttpClientProvider>
                    ),
                },
            ],
            { initialEntries: [`/verify/${id}/${hash}`], initialIndex: 0 }
        );
        render(<RouterProvider router={router} />);
        const $paragraph = screen.queryByRole('paragraph');
        expect($paragraph).not.toBeInTheDocument();
    });
});
