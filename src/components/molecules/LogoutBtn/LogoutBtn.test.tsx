import { UnauthenticatorProvider } from '@/shared/providers/UnauthenticatorProvider';
import { SignOutDispatcher } from '@/shared/types/Contracts/LogoutDispatcher';
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
        };
        render(
            <UnauthenticatorProvider unauthenticator={unauth}>
                <LogoutBtn logoutLoading={logoutLoading} />
            </UnauthenticatorProvider>
        );
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
    });
});
