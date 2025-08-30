import { UnauthenticatorProvider } from '@/shared/providers/UnauthenticatorProvider';
import type { SignOutDispatcher } from '@/shared/types/Contracts/LogoutDispatcher';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { LogoutMenuItem } from '.';

describe('<LogoutMenuItem /> component', () => {
    it('renders correctly', () => {
        const unauth: SignOutDispatcher = {
            async signOut() {
                return { statusCode: 204, body: undefined };
            },
            setToken: vi.fn(),
        };
        const token = faker.word.noun();
        render(
            <UnauthenticatorProvider unauthenticator={unauth} token={token}>
                <ul>
                    <LogoutMenuItem />
                </ul>
            </UnauthenticatorProvider>
        );
        const $el = screen.getByRole('listitem');
        expect($el).toBeInTheDocument();
    });
});
