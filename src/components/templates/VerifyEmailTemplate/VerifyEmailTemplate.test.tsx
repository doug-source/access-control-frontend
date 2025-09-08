import type { VerifyEmailState } from '@/shared/types/States';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { VerifyEmailTemplate } from '.';

describe('<VerifyEmailTemplate /> component', () => {
    it('renders correctly', () => {
        const state: VerifyEmailState = {
            requestStatus: { statusCode: -1 },
            resend: false,
            verified: false,
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <VerifyEmailTemplate
                        state={state}
                        formAction={formAction}
                        pending={false}
                    />
                ),
            },
        ]);
        render(<RouterProvider router={router} />);
        const $el = screen.getByRole('form');
        expect($el).toBeInTheDocument();
    });
    it("renders with email already verified by auth's user's status correctly", () => {
        const userSigned = {
            id: faker.number.int({ min: 1 }).toString(),
            email: faker.internet.email(),
            emailVerified: true,
            name: faker.person.firstName(),
            token: faker.word.noun(),
            phone: null,
            photo: null,
        };
        window.localStorage.setItem('user', JSON.stringify(userSigned));
        const content = faker.word.noun();
        const state: VerifyEmailState = {
            requestStatus: { statusCode: -1 },
            resend: false,
            verified: false,
        };
        const formAction = vi.fn();
        const router = createMemoryRouter([
            {
                path: '/',
                element: (
                    <VerifyEmailTemplate
                        state={state}
                        formAction={formAction}
                        pending={false}
                    />
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
        const content = faker.word.noun();
        const state: VerifyEmailState = {
            requestStatus: { statusCode: -1 },
            resend: false,
            verified: false,
        };
        const formAction = vi.fn();
        const router = createMemoryRouter(
            [
                {
                    path: '/',
                    element: (
                        <VerifyEmailTemplate
                            state={state}
                            formAction={formAction}
                            pending={false}
                        />
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
        const state: VerifyEmailState = {
            requestStatus: { statusCode: -1 },
            resend: false,
            verified: false,
        };
        const formAction = vi.fn();
        const id = faker.number.int().toString();
        const hash = faker.word.noun();
        const router = createMemoryRouter(
            [
                {
                    path: '/verify/:id/:hash',
                    element: (
                        <VerifyEmailTemplate
                            state={state}
                            formAction={formAction}
                            pending={false}
                        />
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
