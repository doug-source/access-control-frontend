import { UnauthenticatorProvider } from '@/shared/providers/UnauthenticatorProvider';
import { SignOutDispatcher } from '@/shared/types/Contracts/LogoutDispatcher';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { LogoutBtn } from '.';

describe('<LogoutBtn /> component', () => {
    it('renders correctly', () => {
        const logoutLoading = vi.fn();
        const signOutFn = vi.fn();
        const unauth: SignOutDispatcher = {
            async signOut() {
                signOutFn();
                return { statusCode: 204, body: undefined };
            },
            setToken: vi.fn(),
        };
        const token = faker.word.noun();
        render(
            <UnauthenticatorProvider unauthenticator={unauth} token={token}>
                <LogoutBtn logoutLoading={logoutLoading} />
            </UnauthenticatorProvider>
        );
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
